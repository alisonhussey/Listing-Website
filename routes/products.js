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
        res.render('products', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    // helpers.addProduct()
    // .then(product => {
    const templateVars = {
      user: req.session.userId,
      isAdmin: req.session.isAdmin,
      //product: product
    };
    res.render('newProduct', templateVars);
  });

  //Render Favourites page
  router.get("/favourites", (req, res) => {
    const templateVars = {
      user: req.session.userId
    };
    //We don't have this page in views yet
    //res.render("favourites", templateVars);
    res.send("This is Get Favourites. The code just not completed!");
  });

  //Rendering each Product Page
  router.get("/:product_id", (req, res) => {
    helpers.getProductById(req.params.product_id)
      .then(product => {
        const templateVars = {
          product: product,
          user: req.session.userId
        };
        res.render('singleProduct', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:product_id/favourite", (req, res) => {
    let time_created = new Date();
    let user_id = req.session.userId;
    let product_id = req.params.product_id;
    helpers.addFavourite(time_created, user_id, product_id)
      .then(favouritedProduct => {
        //console.log("Favourited Product", favouritedProduct);
        const templateVars = {
          user: req.session.userId,
          favouritedProduct: favouritedProduct
        };
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:product_id/delete", (req, res) => {
    const productID = req.params.product_id;
    helpers.deleteProduct(productID)
      .then(() => {
        res.redirect("/products");
      })
      .catch(err => {
        return console.log('query error:', err);
      });
  });

  router.post("/new", (req, res) => {
    const templateVars = {
      user: req.session.userId,
      product: product
    };
    res.render("newProduct", templateVars);
  });

  return router;
};

