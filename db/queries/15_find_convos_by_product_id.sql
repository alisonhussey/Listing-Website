SELECT messageUsers.first_name, messages.content, messages.time_sent
FROM messages
JOIN users as messageUsers ON messages.sender = messageUsers.id
JOIN conversations ON conversations.id = messages.conversation_id
JOIN products ON products.id = conversations.product_id
JOIN users ON users.id = user_id
WHERE product_id = 3
ORDER BY messages.time_sent;

