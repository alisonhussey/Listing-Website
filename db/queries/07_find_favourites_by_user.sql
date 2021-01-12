SELECT products.name
FROM products
JOIN favourite_products ON products.id = product_id
JOIN users ON users.id = favourite_products.user_id
WHERE users.email = 'alisonhussey@gmail.com';
