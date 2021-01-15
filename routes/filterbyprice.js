const express = require('express');
const router = express.Router();
const helpers = require('../db/index');
const products = require('./products');

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
  .then(products => {

  })
    //We don't have this page in views yet
  res.render("filterByPrice");
});

  return router;
};


