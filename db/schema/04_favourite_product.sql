DROP TABLE IF EXISTS favourite_product CASCADE;

CREATE TABLE favourite_product (
  id SERIAL PRIMARY KEY NOT NULL,
  time_created TIMESTAMP,
  is_favourite BOOLEAN NOT NULL DEFAULT false,
  product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE
);
