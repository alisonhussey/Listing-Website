const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

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

  const values = [category.name];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(err => console.log(err.stack));
};
exports.getProductsByPrice = getProductsByPrice;
