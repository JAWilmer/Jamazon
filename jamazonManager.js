// Dependencies 
let mysql = require("mysql");
let inquirer = require("inquirer");
let chalk = require("chalk");
let consoleTable = require("console.table");
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
});

// Function to list Manager duty options
let managerDuties = function () {
    inquirer.prompt([{
        name: "manageInventory",
        type: "list",
        message: chalk.blue.bold("\n\nHowdy, Manager!  How would you like to manage your inventory?\n\n"),
        choices: [
            'View Products for Sale',
            'View Items with Low Inventory',
            'Add to Inventory',
            'Add New Product',
            'Exit'
        ]
    }]).then(function (manageInventoryAnswer) {

        switch (manageInventoryAnswer.manageInventory) {
            case "View Products for Sale":
                productsForSale();
                break;
            case "View Items with Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}
managerDuties();

// Function to list products for sale
function productsForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        managerDuties();
    });
}

// Function to list items with total stock count of less than 100.   
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 99", function (err, results) {
        if (err) {
            throw err
        } else if (!results.length) {
            console.log(chalk.green(`\nYou have 100 or more of each item in your inventory. Your store is fully stocked.\n`))
        } else {
            console.log(chalk.magenta.bold(`\nThere are fewer than 100 of each of these items in stock.\n`))
            console.table(results);
        }
        managerDuties();
    });
}

// Function to allow manager to add stock count to currently inventoried products
function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: chalk.cyan("Which product would you like to restock:"),
                choices: function () {
                    let productArray = [];
                    for (var i = 0; i < results.length; i++) {
                        productArray.push(results[i].product_name);
                    }
                    return productArray;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: chalk.cyan("How many items would you like to add?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log(chalk.red.bold(`\n\nPlease enter a number.\n`));
                        return false;
                    }
                }
            }
        ]).then(function (restockAnswer) {
            console.log("restock answer: ", restockAnswer)
            console.log("results[0].stock_quantity", results[0].stock_quantity)
            console.log('restockAnswer.quantity', restockAnswer.quantity)
            let updatedQuantity = parseInt(results[0].stock_quantity) + parseInt(restockAnswer.quantity);
            let productName = restockAnswer.product
            connection.query('UPDATE products SET ? WHERE ?',
                [{
                    stock_quantity: updatedQuantity
                },
                {
                    product_name: productName
                }],
                function (err, results) {
                    if (err) throw err;
                    console.log(chalk.magenta(`\n\n${productName} stock count has been updated to: ${updatedQuantity} items.\nYour inventory now looks like this: \n`));
                    productsForSale();
                });
        })
    });
}

// Function to add a new product to inventory
function addProduct() {
    inquirer.prompt([
        {
            name: "newProduct",
            type: "input",
            message: chalk.cyan("\nWhat product would you like to add?")
        },
        {
            name: "department",
            type: "input",
            message: chalk.cyan("\nIn which department should we classify this item?")
        },
        {
            name: "price",
            type: "input",
            message: chalk.cyan("\nWhat is the price per unit? Please enter price in this format: 000.00."),
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
            name: "stockCount",
            type: "input",
            message: chalk.cyan("\nHow many of this new product are you adding to stock?"),
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(chalk.red.bold(`\n\nPlease enter a number.\n`));
                    return false;
                }
            }
        }
    ]).then(function (stockAnswer) {
        // Update MySQL to reflect new product
        connection.query("INSERT INTO products SET ?",
            {
                product_name: stockAnswer.newProduct,
                department_name: stockAnswer.department,
                price: stockAnswer.price,
                stock_quantity: stockAnswer.stockCount
            },
            function (err) {
                if (err) throw (err)
                console.log(chalk.magenta(`\n Your new product has been added succesfully! Your inventory now contains:\n`));
                productsForSale();
            });
    })
}





