let mysql = require("mysql");
let inquirer = require("inquirer");
// let chalk = require("chalk");
// let table = require("cli-table3");


// const con = require('./connect');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "jamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log(`Connected as id ${connection.threadId}\n`);
    console.log(`Thank you for shopping at Julie Anne's Zon store (Jamazon).  Currently we have these items in stock:\n`)
    //displayInventory();
    selectById()
});

function selectById() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        results.forEach(products => {
            console.log(`${products.item_id}  ${products.product_name}, $${products.price}`)
        })
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
            },


            {
                name: "stock_quantity",
                type: "input",
                message: "How many units of that item would you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log(`Please enter a number.`);
                        return false;
                    }
                }
            }
        ]).then(function (answers) {
            // console.log(answers)

            let itemId = answers.item_id;
            let quantity = answers.stock_quantity;
            connection.query("SELECT * FROM products WHERE ?", { item_id: itemId }, function (err, results) {
                if (err) throw err;
                console.log(results)
                if (results[0].stock_quantity > quantity) {

                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: results[0].stock_quantity - quantity
                        },
                        {
                            item_id: itemId
                        }], function (error) {
                            if (error) throw err;

                            console.log(`\n\nThank you for your purchase!`)
                        })
                }else{
                    console.log ("We're sorry, we don't have that many, please choose a different quanity.");
                }
            })
        })
    })
}

