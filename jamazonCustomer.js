// Dependencies 
let mysql = require("mysql");
let inquirer = require("inquirer");
let chalk = require("chalk");
require('dotenv').config();
var mysql_pass = process.env.MYSQL_PASS;

// Connection to MySQL
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: mysql_pass,
    database: "jamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    // console.log(`Connected as id ${connection.threadId}\n`);
    console.log(chalk.blue.bold(`\n\nThank you for shopping at Julie Anne's Zon store (Jamazon).  Currently we have these items in stock:\n`))
    selectById();
});

// Function to list items for sale and allow user to select one
function selectById() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        results.forEach(products => {
            console.log(chalk.magenta(`${products.item_id}  ${products.product_name}, $${products.price}`))
        })
        console.log(`\n`)
        inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: chalk.cyan("What is the id number of the item you would like to buy?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log(chalk.red.bold(`\n\nPlease enter a number.\n`));
                        return false;
                    }
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: chalk.cyan("How many units of that item would you would like to buy?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log(chalk.red.bold(`\n\nPlease enter a number.\n`));
                        return false;
                    }
                }
            }
        ]).then(function (answers) {
            let itemId = answers.item_id;
            let itemIndex = (answers.item_id - 1);
            let quantity = answers.stock_quantity;
            var totalCost = quantity * results[itemIndex].price;
            var totalCostDecimal = Math.round(totalCost*Math.pow(10,2))/Math.pow(10,2);
            let newSales = (results[itemIndex].product_sales + totalCost);
            let newStock = results[itemIndex].stock_quantity - quantity;
            // Query MySQL to ensure that there are enough items in database for sale
            connection.query("SELECT * FROM products WHERE ?", { item_id: itemId }, function (err, results) {
                if (err) throw err;
                if (results[0].stock_quantity >= quantity) {
                    // Update MySQL to reflect sale
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: newStock,
                            product_sales: newSales
                        },
                        {
                            item_id: itemId
                        }
                    ], function (error) {

                        if (error) throw err;
                        console.log(chalk.green(`\n\nYou ordered ${quantity} ${results[0].product_name} at $${results[0].price} each. Your total cost is: $${totalCostDecimal}.\nThank you for your purchase!\n`));
                        // Direct user to option of additional purchase. 
                        newPurchase();
                    });
                } else {
                    console.log(chalk.red("\n\nInsufficient Quantity! Please choose another item or quantity.\n"));
                    selectById();
                }
            })
        })
    })
}
// Function to allow user to make an additional purchase. 
function newPurchase() {
    inquirer.prompt([
        {
            name: "confirmNewPurchase",
            type: "confirm",
            message: chalk.cyan("\nWould you like to make another purchase?\n"),
            default: true
        }]).then(function (newPurchaseAnswers) {
            if (newPurchaseAnswers.confirmNewPurchase) {
                selectById();
            } else {
                connection.end();
            }
        })
}
