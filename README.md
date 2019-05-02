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

![nodeBamazonStart](https://user-images.githubusercontent.com/46547100/57096884-4a83b680-6ce4-11e9-830b-9d5a22ed94e2.PNG)

* Next a current product list from the MySQL database is shown with each items id, name, and price.

![bamazonproductlist](https://user-images.githubusercontent.com/46547100/57097553-fd084900-6ce5-11e9-935c-bfc4510b0fba.PNG)

* Customers are then prompted for the id of the product they would like to purchase, and how many the wish to order.

![bamazonBuyQuestions](https://user-images.githubusercontent.com/46547100/57096885-4b1c4d00-6ce4-11e9-8c69-ea411c865906.PNG)

* The application then checks the amount of stock available in the database compared to the amount requested for order.
* If there is enough stock customers will recieve a message stating their order was placed.
* Once an order is placed the database will be updated with the new stock amount and the user will recieve a message stating their total purchase cost.

![bamazonorderandcost](https://user-images.githubusercontent.com/46547100/57097544-f7aafe80-6ce5-11e9-8873-dbf1922bc8e0.PNG)
* The customer will then be prompted if they would like to make another purchase or exit.

![bamazonanotheritem](https://user-images.githubusercontent.com/46547100/57097523-e9f57900-6ce5-11e9-8d84-5494dc926b22.PNG)

* If stock is too low a message will state that there is insufficent stock and how many are available for that item.

![bamazonnotenough](https://user-images.githubusercontent.com/46547100/57097771-96cff600-6ce6-11e9-9e63-c5bb7cafe45a.PNG)

* The customer will then be prompted if they would like to make another purchase or exit.

![bamazonanotheritem](https://user-images.githubusercontent.com/46547100/57097523-e9f57900-6ce5-11e9-8d84-5494dc926b22.PNG)

## bamazonManager.js
* To start the application run this code in the terminal: node bamazonManager.js
* The Manager is then prompted with a list of 5 options:
 1. View Products for Sale
 2. View Low Inventory
 3. Add to Inventory
 4. Add New Product
 5. Exit
 
 ### View Products for Sale
 * Managers will be provided with a current list of all products from the MySQL bamazon database with the id, name, price, and stock amounts for viewing.
 
 ### View Low Inventory
 * Managers will be provide with a current list of all products from the bamazon database that have a stock quantity lower than 5.
 
 ### Add to Inventory
 * Managers will be prompted for the id of the product they wish to add inventory to and the amount of inventory to be added.
 * The database will be updated to reflect the new stock amount for that product/item.
 
 ### Add New Product
 * Managers with be prompted for the new products name, the department it will be sold in, the price, and stock amount. 
 * The database is then updated to reflect the new product and a message is relayed stating the new products name, department name, price and how much stock was added.


