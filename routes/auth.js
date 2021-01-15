const express = require('express');
const router = express.Router();
const bcrypt  = require('bcrypt');
const helpers = require('../db/index');
const { response } = require('express');
const { user } = require('pg/lib/defaults');


module.exports = (db) => {
  router.get("/login", (req, res) => {
    const templateVars = {
      user: req.session.userId
    };
    //console.log("Template Variables are:", templateVars);
    res.render("login", templateVars);
  });

  router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  helpers.getUserWithEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
        console.log("user match in database");
        //req.session.userEmail = user.email;
        req.session.userId = user.id;
        req.session.isAdmin = user.is_admin;
        res.redirect("/products");
      } else {
        //console.log("user not matched in database");
        res.redirect("/login");
      }
  })
  .catch(e => res.send(e));
  });

  //Render Page if not New Session
  router.get("/signup", (req, res) => {
    if (req.session.isNew) {
      const templateVars = {
        user: req.session.userId
      };
      res.render("signup", templateVars);
    } else {
      res.redirect("/products")
    }
  });

  //Create a new user
  router.post("/signup", (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
      res.status(400).send('A field has been left empty. Please return and try again.');
    } else {
      //Create user object
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 12);
    const user = {first_name, last_name, email, password, is_admin: false}
    //console.log("Hello!", user)
    //Check against Database
    helpers.getUserWithEmail(email)
    .then(user => {
      if (email === user.email) {
        res.status(400).send('<h1> 🛑 User already exists. Please log in!🛑 </h1>');
        return;
      }
    })
    //Create user
    helpers.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userEmail = user.email;
      req.session.userId = user.id;
      res.redirect("/products");
    })
    .catch(e => res.send(e));
    }
  });

  //Logout route
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
