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
          //products: products[0].id
        };
        console.log("Template Variables are:", templateVars);
        res.render('products', templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Rendering each Product Page
  router.get("/:product_id", (req, res) => {
    const templateVars = {
      product_id: helpers.getProductById[req.params.product_id],
      user: req.session.userId
    };
    res.render("productTwo", templateVars);
});

      router.post("/", (req, res) => {
        let user_id = req.session.userId;
        let product_id = Number(req.body.product_id);
        // const queryString = `
        // INSERT INTO favorite_products (user_id, product_id)
        // VALUES
        // ($1, $2)
        // ;` ;
        // const values = [user_id, product_id];
        //   return db.query(queryString, values)
        //   .then(res=> {
        //     res.send("Success!")
        helpers.addFavourite(favourite)
        .then(favourite => {
          //favourite.user_id
          //favourite.product_id
          res.send("Success!")
          })
          .catch(err => {
            return console.log('query error:', err);
          })
      });

      router.post("/:product_id/delete", (req, res) => {
        if (isAdmin) {
          helpers.deleteProduct(product_id);
          res.redirect("/products");
        } else {
          res.status(403).send('Not authorized for this option!');
        }
      });

  return router;
};
