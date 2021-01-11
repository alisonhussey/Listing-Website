DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  price INTEGER  NOT NULL DEFAULT 0,
  color VARCHAR(255) NOT NULL,
  description text,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_category_id INTEGER REFERENCES product_categories(id) ON DELETE CASCADE
);

