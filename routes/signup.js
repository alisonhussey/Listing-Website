const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();
const helpers = require('../db/index');
//const { response } = require('express');

module.exports = (db) => {
  //Render Page if not New Session
  router.get("/", (req, res) => {
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
  router.post("/", (req, res) => {
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
  return router;
};
