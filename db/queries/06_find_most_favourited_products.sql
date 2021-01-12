SELECT favourite_products.id, COUNT(user_id) as occurence
FROM favourite_products
JOIN users on users.id = user_id
WHERE is_favourite IS true
GROUP BY user_id, favourite_products.id
ORDER BY occurence DESC;
