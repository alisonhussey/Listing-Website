SELECT users.first_name as name, messages.content, messages.time_sent
FROM conversations
JOIN products ON products.id = product_id
JOIN participants on
JOIN users ON participants.user_id = users.id
WHERE product_id = 1
GROUP BY product_id
ORDER BY messages.time_sent;
