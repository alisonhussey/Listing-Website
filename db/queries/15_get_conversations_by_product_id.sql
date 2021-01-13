SELECT users.first_name as name, messages.content, messages.time_sent
FROM messages
JOIN users ON
JOIN products ON messages.sender = products.users.id
JOIN conversations ON products(id) = product_id
WHERE product_id = 1;

