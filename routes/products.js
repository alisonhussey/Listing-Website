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
    let user_id = req.session.userId;
    helpers.getFavouritesByUser(user_id)
      .then(products => {
        const templateVars = {
          user: user_id,
          //isAdmin: req.session.isAdmin,
          products: products
        };
        res.render('favourites', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    // const templateVars = {
    //   user: req.session.userId
    // };
    // //We don't have this page in views yet
    // //res.render("favourites", templateVars);
    // res.send("This is Get Favourites. The code just not completed!");
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
    let product_id = req.params.product_id;
    let user_id = req.session.userId;
    helpers.addFavourite(time_created, product_id, user_id)
      .then(favouritedProduct => {
        //console.log("Favourited Product", favouritedProduct);
        const templateVars = {
          user: user_id,
          favouritedProduct: favouritedProduct
        };
        res.redirect("/products");
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
    let product_name = req.body.name;
    let product_photo_url = req.body.photo_url;
    let product_price = req.body.price;
    let product_color = req.body.color;
    let product_description = req.body.descripton;
    let product_is_available = req.body.is_available;
    let user_id = req.session.userId;
    let product_category_id = req.body.product_category_id;
    helpers.addProduct(product_name, product_photo_url, product_price, product_color, product_description, product_is_available, user_id, product_category_id)
      .then(newProduct => {
        const templateVars = {
          user: user_id,
          newProduct: newProduct
        };
        res.redirect("/products");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

