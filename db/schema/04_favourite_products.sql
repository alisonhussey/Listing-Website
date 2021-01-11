DROP TABLE IF EXISTS favourite_products CASCADE;

CREATE TABLE favourite_products (
  id SERIAL PRIMARY KEY NOT NULL,
  time_created TIMESTAMP,
  is_favourite BOOLEAN NOT NULL DEFAULT false,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
