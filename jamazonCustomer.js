// Dependencies 
let mysql = require("mysql");
let inquirer = require("inquirer");
let chalk = require("chalk");
require('dotenv').config();
var mysql_pass = process.env.MYSQL_PASS;

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
    console.log(chalk.blue(`\n\nThank you for shopping at Julie Anne's Zon store (Jamazon).  Currently we have these items in stock:\n`))
    selectById();
});

function selectById() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        results.forEach(products => {
            console.log(chalk.magenta(`${products.item_id}  ${products.product_name}, $${products.price}`))
        })
        inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: chalk.cyan("\nWhat is the id number of the item you would like to buy?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log(chalk.red(`Please enter a number.`));
                        return false;
                    }
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: chalk.cyan("\nHow many units of that item would you would like to buy?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log(chalk.red(`Please enter a number.`));
                        return false;
                    }
                }
            }
        ]).then(function (answers) {
            let itemId = answers.item_id;
            let itemIndex = (answers.item_id - 1);
            let quantity = answers.stock_quantity;
            var totalCost = quantity * results[itemIndex].price;
            let newSales = (results[itemIndex].product_sales + totalCost);
            let newStock = results[itemIndex].stock_quantity - quantity;

            // console.log(
            //     `  
            //     Product Stock: ${results[itemIndex].stock_quantity} 
            //     Quantity Purchased: ${quantity}
            //     New Stock: ${newStock}
            //     total Cost: ${totalCost}
            //     Current Product Sales: ${results[itemIndex].product_sales}
            //     New Sales: ${newSales}
                
            // `);
            connection.query("SELECT * FROM products WHERE ?", { item_id: itemId }, function (err, results) {
                if (err) throw err;
                // console.log(results)
                if (results[0].stock_quantity >= quantity) {

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
                        console.log(chalk.green(`\n\nYou ordered ${quantity} ${results[0].product_name} at $${results[0].price} each. Your total cost is: $${totalCost}.\nThank you for your purchase!\n`));
                            // `       Product sales $${results[0].product_sales}\n`,
                            // `       New product sales: $${newSales}\n`,
                            // `       Stock quantity: ${results[0].stock_quantity}\n`,
                            // `       New quanity: ${newStock}\n`);
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
