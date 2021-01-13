SELECT sender as name, messages.content, messages.time_sent
FROM messages
JOIN products ON messages.sender = users.id
WHERE sender = $1;


SELECT users.first_name as name, messages.content, messages.time_sent
FROM messages
JOIN users ON messages.sender = users.id
WHERE sender = 1
ORDER BY messages.time_sent;
