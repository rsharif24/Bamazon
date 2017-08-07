create database bamazon;

use bamazon;

create table products(
	item_id int auto_increment not null,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    stock_quantity int null,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee table","furniture","99.99","30");