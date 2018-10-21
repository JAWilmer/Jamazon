let mysql = require("mysql");
let inquirer = require("inquirer");
// let chalk = require("chalk");
// let table = require("cli-table3");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tr1bal",
    database: "jamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log(`Connected as id ${connection.threadId}\n`);
    console.log(`Thank you for shopping at Julie Anne's Zon store (Jamazon).  Currently we have these items in stock:\n`)
    displayInventory();
});

function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        res.forEach(products => {
            console.log(`${products.item_id}  ${products.product_name}, $${products.price}`)
        })
        selectById();
    });
}

function SalePrompt(item_id, stock_quantity) {
    this.item_id = item_id;
    this.stock_quantity = stock_quantity;
}
SalePrompt.prototype.printInfo = function () {
    console.log(`Item Id: ${this.item_id}\nQuantity: ${this.stock_quantity}`);
};

function selectById() {

    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the id number of the item you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(`Please enter a number.`);
                    return false;
                }
            }
        }, {
            name: "stock_quantity",
            type: "input",
            message: "How many units of that item would you would like to buy?", 
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else if (stock_quantity < parseInt(answers.stock_quantity)) {
                    console.log(`We're sorry, we only have ${products.stock_quantity} ${products.product_name} in stock, please enter a new quantity.`)
                } else {
                    console.log(`Please enter a number.`);
                    return false;

                }
            }
        }
    ]).then(function (answers) {
        // hold user input values
        let newSalePrompt = new SalePrompt(
            answers.item_id,
            answers.stock_quantity);
            // print what user input for purchase choice
        newSalePrompt.printInfo();




    });
};


