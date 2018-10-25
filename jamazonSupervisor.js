let mysql = require("mysql");
let inquirer = require("inquirer");
let chalk = require("chalk");
let consoleTable = require("console.table");
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
});

let supervisorDuties = function () {
    inquirer.prompt([{
        name: "manageDepartments",
        type: "list",
        message: chalk.blue("\n\nHowdy, Supervisor!  How would you like to manage your departments?\n\n"),
        choices: [
            'View Product Sales by Department',
            'Create a New Department',
            'Exit'
        ]
    }]).then(function (answer) {

        switch (answer.manageDepartments) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create a New Department":
                addDepartment();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}
supervisorDuties();

function viewSales() {

    let query = 'SELECT departments.department_id, departments.department_name, departments.over_head_cost, sum(products.product_sales) AS product_sales, sum(products.product_sales) - departments.over_head_cost AS total_profit ';
        query += 'FROM departments ';
        query += 'INNER JOIN products ON departments.department_name = products.department_name ';
        query += 'GROUP BY departments.department_id';
  
    connection.query(query, function (error, results) {
      if (error) throw error;
        console.table(results);
        supervisorDuties();
    });
}

// Create a new department
function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: chalk.cyan("\nWhat is the name of the department you wish to add?")
        },
        {
            name: "overhead",
            type: "input",
            message: chalk.cyan("\nWhat is the overhead cost for that department? Please enter price in this format: 000.00."),
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (NewProductAnswer) {
        connection.query("INSERT INTO departments SET ?",
            {
                department_name: NewProductAnswer.department,
                over_head_cost: NewProductAnswer.overhead
            },
            function (err, results) {
                if (err) throw err;
                console.log(chalk.green(`\n\n${NewProductAnswer.department} has been added and set with an overhead cost of: $${NewProductAnswer.overhead}.\nHere is an updates summary of your departments: \n`));
                viewSales();
            });
    })
}
