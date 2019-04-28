var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "3ThreeBelieve!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("you are connected");
  buyProduct();
});

function buyProduct() {
  connection.query("SELECT id, product_name, price FROM products", function(err, results) {
    if (err) throw err;
    //console.log(results);
    //  will need to show this!! - find prettier way to show

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
        //console.log(answer);
         connection.query(`SELECT * FROM products WHERE id = ${answer.id}`, function(err, results) {
           if (err) throw err;
          console.log(results);
          console.log(parseInt(answer.quantity));
          console.log(results[0].stock_quantity);

          if(parseInt(answer.quantity) <= results[0].stock_quantity){
            console.log("we have enough");
          } else {
            console.log('we do not have enough');
          }
         });
      });
  });

  

  
  //   var query = "SELECT id FROM products";
  //     connection.query(query, function(err, res) {
  //
  //    ;
}
