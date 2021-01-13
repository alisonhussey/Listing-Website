SELECT favourite_products.id, COUNT(user_id) as occurence
FROM favourite_products
JOIN users on users.id = user_id
GROUP BY user_id, favourite_products.id
ORDER BY occurence DESC;
