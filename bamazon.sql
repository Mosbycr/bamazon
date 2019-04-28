DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(60) NOT NULL,
    price Decimal (10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);