const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `
  return pool.query(queryString, [email])
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
}

exports.getUserWithEmail = getUserWithEmail;

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
}
exports.addUser = addUser;

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

