DROP TABLE IF EXISTS product_category CASCADE;

CREATE TABLE product_category (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)
);
