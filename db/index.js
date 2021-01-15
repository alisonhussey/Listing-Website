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
    product.price,
    product.color,
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

const deleteProduct = function(product_id) {
  const queryString = `
    DELETE FROM products
    WHERE id = $1;
  `

  return pool.query(queryString, [product_id])
  .then(res => res.rows)
  .then(()=>console.log("DELETE COMPLETED!!!"))
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

const getProductsByPrice = function(options){
  const queryParams = [];
  const queryString = `
  SELECT *
  FROM products
  `;
  if (options.minimum_price) {
    queryParams.push(options.minimum_price);
    queryString += `WHERE price/100 >= $${queryParams.length}`;
  }
  if (options.maximum_price) {
    queryParams.push(options.maximum_price);
    if (queryParams === 1) {
      queryString += `AND price/100 <= $${queryParams.length}`;
    } else {
      queryString += `WHERE price/100 <= $${queryParams.length}`;
    }

  }

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getProductsByPrice = getProductsByPrice;

const getConversationsByUserId = function(user) {
  const queryString = `
  SELECT users.first_name as name, messages.content, messages.time_sent
  FROM messages
  JOIN users ON messages.sender = users.id
  WHERE sender = $1
  ORDER BY messages.time_sent;
  `
  const values = [user.id];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getConversationsByUserId = getConversationsByUserId;

const getConversationsByProductId = function(product) {
  const queryString = `
  SELECT messageUsers.first_name, messages.content, messages.time_sent
  FROM messages
  JOIN users as messageUsers ON messages.sender = messageUsers.id
  JOIN conversations ON conversations.id = messages.conversation_id
  JOIN products ON products.id = conversations.product_id
  JOIN users ON users.id = user_id
  WHERE product_id = $1
  ORDER BY messages.time_sent;
 `
const values = [product.id];
return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getConversationsByProductId = getConversationsByProductId;

const getProductById = function(product_id) {
  const queryString = `
  SELECT *
  FROM products
  WHERE id = $1;
  `

  return pool.query(queryString, [product_id])
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.getProductById = getProductById;

const addMessage = function(message) {
  const queryString = `
  INSERT INTO messages (content, time_sent, conversation_id, sender)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `
  const values = [
    message.content,
    message.time_spent,
    message.conversation_id,
    message.sender
  ]
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.addMessage = addMessage;

const addFavourite = function(time_created, product_id, user_id) {
  //if(!user_id || !product_id) return null;
  const queryString = `
    INSERT INTO favourite_products (time_created, product_id, user_id)
    VALUES($1, $2, $3)
    RETURNING *;
  `
  const values = [time_created, product_id, user_id]
  return pool.query(queryString, values)
  .then(res => {
    console.log("res.rows", res.rows);
    return res;
  })
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
};
exports.addFavourite = addFavourite;

const getAllUsers = function() {
  queryString = `
  SELECT *
  FROM users;
  `
  return pool.query(queryString)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
}
exports.getAllUsers = getAllUsers;
