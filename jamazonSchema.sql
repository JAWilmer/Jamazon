DROP DATABASE IF EXISTS jamazon;

CREATE DATABASE jamazon;
USE jamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0
);
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  over_head_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
);

SELECT * FROM products;