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

function manageInventory() {
  inquirer
    .prompt({
      name: "manageInventory",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      if (answer.manageInventory === "View Products for Sale") {
        viewProducts();
      } else if (answer.manageInventory === "View Low Inventory") {
        lowInventory();
      } else if (answer.manageInventory === "Add to Inventory") {
        addInventory();
      } else if (answer.manageInventory === "Add New Product") {
        console.log("add product");
      } else {
        connection.end();
      }
    });
}

function viewProducts() {
  connection.query(
    "SELECT id, product_name, price, stock_quantity FROM products",
    function(err, results) {
      if (err) throw err;
      console.log(JSON.stringify(results));
    }
  );
}

function lowInventory() {
  connection.query(
    "SELECT id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5",
    function(err, results) {
      if (err) throw err;
      console.log(JSON.stringify(results));
    }
  );
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id of the product you wish to add inventory for?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How much stock would you like to add?"
      }
    ])
    .then(function(answer) {
      //query table for the specific id and check the quantity requested against available
      //id = answer.id;
      connection.query(
        `SELECT id, stock_quantity FROM products WHERE id = ${answer.id}`,
        function(err, results) {
          if (err) throw err;
          console.log(JSON.stringify(results));
          console.log(results[0].stock_quantity);
          console.log(
            results[0].stock_quantity + parseInt(answer.quantity));
          connection.query(
            `UPDATE products SET ? WHERE ?`,
            [
              {
                stock_quantity: results[0].stock_quantity + parseInt(answer.quantity)
              },
              {
                id: answer.id
              }
            ],
            function(err, results) {
              if (err) throw err;
              console.log(
                `you added ${answer.quantity} item(s) to the inventory`
              );
            }
          );
        }
      );
  });
}
