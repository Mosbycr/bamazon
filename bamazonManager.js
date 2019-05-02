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
        createProduct();
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
      console.log(JSON.stringify(results, null, 2));
    }
  );
}

function lowInventory() {
  connection.query(
    "SELECT id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5",
    function(err, results) {
      if (err) throw err;
      console.log(JSON.stringify(results, null, 2));
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
      //query table for the specific id and it's stock quantity
      connection.query(
        `SELECT id, stock_quantity FROM products WHERE id = ${answer.id}`,
        function(err, results) {
          if (err) throw err;
          //ran update after obtaining id specific information
          connection.query(
            `UPDATE products SET ? WHERE ?`,
            [
              {
                stock_quantity:
                  results[0].stock_quantity + parseInt(answer.quantity)
              },
              {
                id: answer.id
              }
            ],
            function(err) {
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

function createProduct() {
  inquirer
    .prompt([
      {
        name: "productName",
        type: "input",
        message: "What is the name of the product?"
      },
      {
        name: "departmentName",
        type: "input",
        message: "What is the department the product is sold in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the product?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How much stock would you like to add?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.productName,
          department_name: answer.departmentName,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err, results) {
          if (err) throw err;
          console.log(`You have added ${answer.quantity} ${answer.productName}(s) to the ${answer.departmentName} department with a price of ${answer.price} each.`);
        }
      );
    });
}
