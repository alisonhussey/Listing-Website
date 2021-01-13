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
}
exports.getUserWithId = getUserWithId;

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
