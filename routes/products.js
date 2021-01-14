const express = require('express');
const router  = express.Router();
const helpers = require('../db/index');


module.exports = (db) => {
  router.get("/", (req, res) => {
    helpers.getAllProducts()
      .then(products => {
        const templateVars = {
          user: req.session.userId,
          isAdmin: req.session.isAdmin,
          products: products
        };
        console.log("Template Variables are:", templateVars);
        res.render('products', templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

      router.post("/", (req, res) => {
        let user_id = req.session.userId;
        let product_id = Number(req.body.product_id);
        const queryString = `
        INSERT INTO favorite_products (user_id, product_id)
        VALUES
        ($1, $2)
        ;` ;
        const values = [user_id, product_id];
          return db.query(queryString, values)
          .then(res=> {
            res.send("Success!")
          })
          .catch(err => {
            return console.log('query error:', err);
          })
        });

  });

  return router;
};
