const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
const addUser =  function(user) {
  const queryString = `
  INSERT INTO users (first_name, last_name, email, password, is_admin)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `
  const values = [user.first_name, user.last_name, user.email, user.password, user.is_admin];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.addUser = addUser;

const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `
  return pool.query(queryString, [email])
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = function(id) {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
  `;
  const values = [id];
  return pool.query(queryString, values)
    .then(res => res.rows[0] || null)
    .catch(err => console.log(err.stack));
};
exports.getUserWithId = getUserWithId;

const addProduct = function(product) {
  const queryString = `INSERT INTO products (name, photo_url, price, color, description, is_available, user_id, product_category_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `
  const values = [
    product.name,
    product.photo_url,
    product. price,
    product. color,
    product.description,
    product.is_available,
    product.user_id,
    product.product_category_id
  ];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.addProduct = addProduct;

const markAsSold = function(product) {
  const queryString = `
  UPDATE products
  SET is_available = false
  WHERE id = $1;
  `
  const values = [product.id];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.markAsSold = markAsSold;

const deleteProduct = function(product) {
  const queryString = `
    DELETE FROM products
    WHERE id = $1;
  `
  const values = [product.id];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.deleteProduct = deleteProduct;

const getAllProducts = function() {
  const queryString = `
  SELECT *
  FROM products;
  `
  return pool.query(queryString)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getAllProducts = getAllProducts;

const getFavouritesByUser = function(user) {
  const queryString = `
  SELECT products.name
  FROM products
  JOIN favourite_products ON products.id = product_id
  JOIN users ON users.id = favourite_products.user_id
  WHERE users.id = $1;
  `
  values = [user.id];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.getFavouritesByUser = getFavouritesByUser;


const getProductsByCategory = function(category){
  const queryString = `
  SELECT *
  FROM products
  JOIN product_categories ON product_categories.id = product_category_id
  WHERE product_categories.name = $1;
  `
  const values = [category.name];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getProductsByCategory = getProductsByCategory;

const getProductsByPrice = function(category){
  const queryString = `
  SELECT *
  FROM products
  WHERE price >= $1 AND price <= $2
  ORDER BY price;
  `
  const values = [category.name];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getProductsByPrice = getProductsByPrice;

const getConversationsByUserId = function (user) {
  const queryString = `
  SELECT users.first_name as name, messages.content, messages.time_sent
  FROM messages
  JOIN users ON messages.sender = users.id
  WHERE sender = 1
  ORDER BY messages.time_sent;
  `
  const values = [user.id];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getConversationsByUserId = getConversationsByUserId;
