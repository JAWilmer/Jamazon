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
    // console.log(`Connected as id ${connection.threadId}\n`);
    console.log(`Thank you for shopping at Julie Anne's Zon store (Jamazon).  Currently we have these items in stock:\n`)
    selectById();
});

function selectById() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        results.forEach(products => {
            console.log(`${products.item_id}  ${products.product_name}, $${products.price}`)
        })
        // let newQuantity = function() {
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
            console.log(answers)
            let itemId = answers.item_id;
            let itemIndex = (answers.item_id - 1);
            let quantity = answers.stock_quantity;
            var totalCost = quantity * results[itemIndex].price;
            console.log(quantity)
            console.log(JSON.stringify(results[itemIndex]))
            console.log('total Cost:')
            console.log(totalCost)
            console.log (results[itemIndex].product_sales)
            let newSales = parseInt(results.product_sales + totalCost);
            console.log(`New Sales: ${newSales}`)
            connection.query("SELECT * FROM products WHERE ?", { item_id: itemId }, function (err, results) {
                if (err) throw err;
                // console.log(results)
                if (results[0].stock_quantity >= quantity) {
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: results[0].stock_quantity - quantity
                        },
                        {
                            item_id: itemId
                        }, 
                        {
                            product_sales: newSales
                        }
                    ], function (error) {

                            if (error) throw err;
                            console.log(`You ordered ${quantity} ${results[0].product_name} at $${results[0].price} each. Your total cost is: $${totalCost}.`);
                            console.log(`\n\nThank you for your purchase!`);
                            console.log(`results product sales $${results[0].product_sales}.`);
                            console.log(`totalCost:`, totalCost)
                            console.log(`price:`, results[0].price)
                            console.log(`quantity: `, quantity)
                        })
                } else {
                    console.log("Insufficient Quantity!")
                    // console.log("We're sorry, we only have BLANK in stock, please choose a different quanity.");
                    // newQuantity();
                    // call back to enter quantity prompt. 
                }
                connection.end();
            })
        })
    })
}
// newQuantity();

