DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  content TEXT,
  time_sent TIMESTAMP,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  sender INTEGER REFERENCES users(id) ON DELETE CASCADE
);




