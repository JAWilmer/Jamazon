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

let supervisorDuties = function () {
    inquirer.prompt([{
        name: "manageDepartments",
        type: "list",
        message: "\n\nHowdy, Supervisor!  How would you like to manage your departments?\n\n",
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

    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
        supervisorDuties();
    });
}

// Create a new department
function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "list",
            message: "What is the name of the department you wish to add?",
        },
        {
            name: "overhead",
            type: "input",
            message: "What is the overhead cost for that department?"
        }
    ]).then(function (NewProductAnswer) {
        connection.query("SELECT * FROM departments",
            {
                department_name: NewProductAnswer.department,
                over_head_cost: NewProductAnswer.overhead
            },
            function (err, results) {
                if (err) throw err;
                console.log(results)
                console.log(`${departmentName} has been added and set with an overhead cost of: $${overheadCost}.`);
                viewSales();
                supervisorDuties();
            });
    })
}
