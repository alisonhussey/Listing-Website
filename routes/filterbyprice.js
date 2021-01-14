const express = require('express');
const router = express.Router();
const helpers = require('../db/index');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.userId
    };
    //We don't have this page in views yet
    res.render("filterByPrice", templateVars);
});

router.post("/", (req, res) => {
  let minimum_price = req.body.minimum_price;
  let maximum_price = req.body.maximum_price;

  helpers.getProductsByPrice(options)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
        console.log("user match in database");
        //req.session.userEmail = user.email;
        req.session.userId = user.id;
        req.session.isAdmin = user.is_admin;
        res.redirect("/products");
      } else {
        console.log("user not matched in database");
        res.redirect("/login");
      }
  })

  return router;
};


