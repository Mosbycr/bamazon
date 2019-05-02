# Bamazon
A CLI application that allows customers to view and buy products with sufficient quantities available. It also allows managers to view inventory, low inventory, add inventory, and add new products. Utilizes JavaScript, npm inquirer, MySQL, and Node.js

# Installation
In order to run this app you will need to:
* npm install mysql
* npm install inquirer
* add your MySQL password to bamazon.js and bamazonManager.js where it is commented in the database connection.
* run the bamazon.sql code in MySQL to create the database and table.
* import the bamazon.csv into the Products table in the bamazon database in your MySQL.

# Getting Started
There are two different applications that can be run:
1. bamazon.js - Customer Interface
2. bamazonManager.js - Manager Interface

## bamazon.js
* To start the application run this command in the terminal: node bamazon.js
* Next a current product list from the MySQL database is shown with each items id, name, and price.
* Customers are then prompted for the id of the product they would like to purchase, and how many the wish to order.
* The application then checks the amount of stock available in the database compared to the amount requested for order.
* If there is enough stock customers will recieve a message stating their order was placed.
* Once an order is placed the database will be updated with the new stock amount and the user will recieve a message stating their total purchase cost.
* The customer will then be prompted if they would like to make another purchase or exit.
* If stock is too low a message will state that there is insufficent stock and how many are available for that item.
* The customer will then be prompted if they would like to make another purchase or exit.
