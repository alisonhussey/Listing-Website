// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

//Code Below Shall Be Reorganized in Appropriate End-Point Files

//If not user, attempting tp use functionalities redirect to Log In
//If user, functionalities do not redirect to Log In (But actually do their function)
//If user Admin, sees Amin options (Mark as sold, Delete)
app.get("/products", (req, res) => {
  res.render("products");
});

//Render Create Products Page (Only Admin)
// app.get("/products/new", (req, res) => {
//
// });

//Send Created Product Form to Product page
// app.post("/products", (req, res) => {
//
// });

//About Us - Render Page
app.get("/about", (req, res) => {
  res.render("about");
});

//Sign Up - Render Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

//Sign Up - Post
//Will need to check fields left empty - 400/401
//Will need to check if email taken - 400/403
//If all ok, will create new user
//Redirect to Products Page
app.post("/signup", (req, res) => {
  res.send("Signed Up");
});

//Log In - Render Page
app.get("/login", (req, res) => {
  res.render("login");
});

//Log In User - Post
//Will need to check fields left empty - 401
//Will need to check email exists - 403
//Check if email & password matches - 403
//Redirect to Home Page
app.post("/login", (req, res) => {
  res.send("Logged In");
});

//Log Out User
app.post("/logout", (req, res) => {
  //req.session = null;
  // res.redirect("/urls");
  res.send("Logged Out")
});

//Favourites - Render Page
//Check user cookie
//Return what favourited products that match user id
app.get("/products/favourites", (req, res) => {
  //res.render("favourites");
});

//Favourite Product
//Add entry to favourites db
app.post("/products/:product_id/favourite", (req, res) => {
  //res.send("Add product");
});

//Unfavourite Product
//Deletes entry from favourites db
app.post("/products/:product_id/favourite", (req, res) => {
  //res.send("Delete product");
});

//Product - Render Unique Page
// app.get("/product/:products_id", (req, res) => {
//   res.render("/productURL");
// });

//List all messages for each user grouped by product
app.get("/messages", (req, res) => {
  //res.render("messages");
});

// List messages for each user on the product page
app.get("/messages/:conversation_id", (req, res) => {
  // res.render("productsMessaged");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
