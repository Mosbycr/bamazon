var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // Your password for MySQL goes here
  password: "3ThreeBelieve!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  manageInventory();
});

function manageInventory(){
     inquirer
       .prompt({
         name: "manageInventory",
         type: "list",
         message: "What would you like to do?",
         choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
       })
       .then(function(answer) {
         if (answer.manageInventory === "View Products for Sale") {
           console.log("view");
         } else if (answer.manageInventory === "View Low Inventory"){
           console.log("low inventory");
         } else if (answer.manageInventory === "Add to Inventory"){
            console.log("add inventory");
         } else if (answer.manageInventory === "Add New Product"){
            console.log("add product");
         } else {
             connection.end();
         }
       });
}