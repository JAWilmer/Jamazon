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
    // query the database for all products available for purchase
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the products, prompt the user for which they'd like to purchase
        inquirer.prompt([
            {
                name: "manageInventory",
                type: "list",
                message: "\n\nHowdy, Manager!  How would you like to manage your inventory?",
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product',
                ]
            }
        ]).then(function (manageInventoryAnswer) {

            switch (manageInventoryAnswer.manageInventory) {
                case "View Products for Sale":
                    connection.query("SELECT * FROM products", function (err, results) {
                        if (err) throw err;
                        console.table(results);
                        managerDuties();
                    });
                    break;
                case "View Low Inventory":
                    connection.query("SELECT * FROM products WHERE stock_quantity < 25", function (err, results) {
                        if (err) throw err;
                        console.table(results);
                        managerDuties();
                    });
                    break;
                case "Add to Inventory":
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
                        console.log("restock answer: ", restockAnswer)
                        console.log("results[0].stock_quantity", results[0].stock_quantity)
                        console.log('restockAnswer.quantity', restockAnswer.quantity)
                        // do i need to parseInt?
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
            }
        })
    })
}
managerDuties();
