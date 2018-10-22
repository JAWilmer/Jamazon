let mysql = require("mysql");
let inquirer = require("inquirer");
let chalk = require("chalk");
let consoleTable = require("console.table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "jamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

let managerDuties = function () {
    inquirer.prompt([{
        name: "manageInventory",
        type: "list",
        message: "\n\nHowdy, Manager!  How would you like to manage your inventory?",
        choices: [
            'View Products for Sale',
            'View Low Inventory',
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
            case 'EXIT':
                process.exit();
        }
    })
}
managerDuties();

function productsForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        managerDuties();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 25", function (err, results) {
        
        if (err) {
             throw err 
        } else if (!err) {
            console.table(results);
        } else {
            console.lot(`You have 25 or more of each item in your inventory. Your store is fully stocked.`)
        }
        managerDuties();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: "Which product would you like to restock:",
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
                message: "How many items would you like to add?"
            }
        ]).then(function (restockAnswer) {
            // add in nan info
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
                    console.log(results)
                    console.log(`${productName} stock has been updated to: ${updatedQuantity}.`);
                    managerDuties();
                });
        })
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "newProduct",
            type: "input",
            message: "What product would you like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "In which department should we classify this item?",
        },
        {
            name: "price",
            type: "input",
            message: "What is the price per unit? Please enter price in this format: $000.00",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stockCount",
            type: "input",
            message: "How many of this new product are you adding to stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (stockAnswer) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: stockAnswer.newProduct,
                department_name: stockAnswer.department,
                price: stockAnswer.price,
                stock_quantity: stockAnswer.stockCount
            },
            function (err) {
                if (err) throw (err)
                console.log(`\n Your new product has been added succesfully! Your inventory now contains:\n`);
                productsForSale();
            });
    })
}





