DROP DATABASE IF EXISTS jamazon;

CREATE DATABASE jamazon;
USE jamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT,
  product_sales DECIMAL(10,2) DEFAULT 0
);


CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  over_head_cost DECIMAL(10,2) NOT NULL DEFAULT 0
);

SELECT * FROM products;