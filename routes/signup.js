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
    let username = req.body.username;
    //user.email=req.body.email
    let password = bcrypt.hashSync(req.body.password, 12);
    const user = {username, password, first_name: "Alex", last_name: "Neville", email: "blabla@blabla.com", is_admin: false}
    console.log("Hello!", user, username, password)
    // helpers.addUser(user)
    // .then(user => {
    //   if (!user) {
    //     res.send({error: "error"});
    //     return;
    //   }
    //   //req.session.userId = user.id;
    //   res.send("🤗");
      res.redirect("/");
    // })
    // .catch(e => res.send(e));
  });
  return router;
};
