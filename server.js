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
const cookieSession = require('cookie-session');

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

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");

const indexRoutes = require("./routes/index");
const aboutRoutes = require("./routes/about");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const productsRoutes = require("./routes/products");
const fbpRoutes = require("./routes/filterbyprice");
const createnewRoutes = require("./routes/createnew");
const searchRoutes = require("./routes/search");


// Mount all resource routes
app.use("/api/users", usersRoutes(db));

app.use("/", indexRoutes(db))
app.use("/about", aboutRoutes(db))
app.use("/signup", signupRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/products", productsRoutes(db));
app.use("/filterbyprice", fbpRoutes(db));
app.use("/createnew", createnewRoutes(db));
app.use("/search", searchRoutes(db));




// Home page OK
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

//Code Below Shall Be Reorganized in Appropriate End-Point Files

//WORKING ON THIS ONE
//If not user, attempting tp use functionalities redirect to Log In
//If user, functionalities do not redirect to Log In (But actually do their function)
//If user Admin, sees Amin options (Mark as sold, Delete)
// app.get("/products", (req, res) => {
//   res.render("products");
// });

//Render Create Products Page (Only Admin) FILE CREATED
// app.get("/products/new", (req, res) => {
//
// });

//Send Created Product Form to Product page
// app.post("/products", (req, res) => {
//
// });

//About Us - Render Page OK
// app.get("/about", (req, res) => {
//   res.render("about");
// });

//Sign Up - Render Page OK
// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

//Sign Up - Post OK
//Will need to check fields left empty - 400/401
//Will need to check if email taken - 400/403
//If all ok, will create new user
//Redirect to Products Page
// app.post("/signup", (req, res) => {
//   res.send("Signed Up");
// });

//Log In - Render Page OK
// app.get("/login", (req, res) => {
//   res.render("login");
// });

//Log In User - Post OK
//Will need to check fields left empty - 401
//Will need to check email exists - 403
//Check if email & password matches - 403
//Redirect to Home Page
// app.post("/login", (req, res) => {
//   res.send("Logged In");
// });

//Log Out User OK
// app.post("/logout", (req, res) => {
//   //req.session = null;
//   // res.redirect("/urls");
//   res.send("Logged Out")
// });

//Favourites - Render Page FILE CREATED
//Check user cookie
//Return what favourited products that match user id
//app.get("/products/favourites", (req, res) => {
  //res.render("favourites");
//});

//Favourite Product
//Add entry to favourites db
//app.post("/products/:product_id/favourite", (req, res) => {
  //res.send("Add product");
//});

//Unfavourite Product
//Deletes entry from favourites db
//app.post("/products/:product_id/favourite", (req, res) => {
  //res.send("Delete product");
//);

//Product - Render Unique Page
// app.get("/product/:products_id", (req, res) => {
//   res.render("/productURL");
// });

//List all messages for each user grouped by product
//app.get("/messages", (req, res) => {
  //res.render("messages");
//});

// List messages for each user on the product page
//app.get("/messages/:conversation_id", (req, res) => {
  // res.render("productsMessaged");
//});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
