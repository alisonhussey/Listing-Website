SELECT users.first_name as name, messages.content, messages.time_sent
FROM messages
JOIN conversations ON conversations.id = conversation_id
JOIN participants ON participants.conversation_id = conversation_id
JOIN users ON users.id = user_id
JOIN products ON conversation.product_id = product_id
WHERE product_id = 1
GROUP BY product_id
ORDER BY messages.time_sent;
