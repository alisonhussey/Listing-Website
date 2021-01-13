const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();
const helpers = require('../db/index');
//const { response } = require('express');

module.exports = (db) => {
  //Render Page
  router.get("/", (req, res) => {
    res.render("signup");
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
    helpers.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      //req.session.userId = user.id;
      res.redirect("/");
    })
    .catch(e => res.send(e));
    }
  });
  return router;
};
