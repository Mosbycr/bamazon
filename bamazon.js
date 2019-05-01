var mysql = require("mysql");
var inquirer = require("inquirer");

//connecting to the database
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
  buyProduct();
});

//setting global variables for user inputed id and quantity
var id;
var quantity;
var stockQuantity;

//querys the product table for information to be shown to purchaser
function buyProduct() {
  connection.query("SELECT id, product_name, price FROM products", function(err,results) {
    if (err) throw err;
    console.log(results);
    //  will need to show this!! - find prettier way to show

    // asks what item purchaser wants and quantity
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the id of the product you wish to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function(answer) {
        //query table for the specific id and check the quantity requested against available
        id = answer.id;
        connection.query(`SELECT id, price, stock_quantity FROM products WHERE id = ${id}`, function(err,results) {
          if (err) throw err;

          quantity = answer.quantity;
          stockQuantity = results[0].stock_quantity;

          if (parseInt(quantity) <= stockQuantity) {
            console.log('\nYour order has been placed!');
            updateStock();
            //calculates total purchase price to be shown after update
            var totalCost = results[0].price * quantity;
            console.log(`Your order cost $${totalCost}\n`);
             tryAgainPurchase();

          } else {
            console.log(`\nWe do not have enough of that item in stock to meet your request. 
            \nWe only have ${stockQuantity} of that item in stock. Please choose a lower quantity or another item.\n`
            );
            tryAgainPurchase();
          }
        });
      });
  });
}

//update the stock quantity in database to reflect what was bought
function updateStock() {
  connection.query("UPDATE products SET ? WHERE ?" , 
  [
    {
      stock_quantity: stockQuantity - quantity
    },
    {
      id: id
    }
  ],
  function(err,results) {
    if (err) throw err;
  });
}

//will restart the purchasing process if quantity is too low.
function tryAgainPurchase() {
  inquirer
    .prompt({
      name: "purchaseOrEnd",
      type: "list",
      message: "Would you like to purchase an item?",
      choices: ["Purchase", "Exit"]
    })
    .then(function(answer) {
      if(answer.purchaseOrEnd === "Purchase"){
        buyProduct();
      } else {
        connection.end();
      }
    });
}
