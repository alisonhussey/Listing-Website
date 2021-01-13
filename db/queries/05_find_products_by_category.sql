SELECT *
FROM products
JOIN product_categories ON product_categories.id = product_category_id
WHERE product_categories.name = 'shoes';
