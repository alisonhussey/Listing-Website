const express = require('express');
const router = express.Router();
const bcrypt  = require('bcrypt');
const helpers = require('../db/index');
const { response } = require('express');
const { user } = require('pg/lib/defaults');


module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.userId
    };
    console.log("Template Variables are:", templateVars);
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  helpers.getUserWithEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
        console.log("user match in database");
        //req.session.userEmail = user.email;
        req.session.userId = user.id;
        //req.session.isAdmin = user.isAdmin
        res.redirect("/");
      } else {
        console.log("user not matched in database");
        res.redirect("/login");
      }
  })
  .catch(e => res.send(e));
  });

  return router;
};
