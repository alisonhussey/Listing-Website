SELECT users.first_name as name, messages.content, messages.time_sent
FROM messages
JOIN conversations ON conversations.id = messages.conversation_id
JOIN products ON products.id = conversations.product_id
JOIN users ON users.id = user_id
WHERE product_id = 1
GROUP BY product_id, users.first_name, messages.content, messages.time_sent
ORDER BY messages.time_sent;

