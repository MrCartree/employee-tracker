const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const password = require("./password");
// const { inherits } = require("util");

const connection = mysql.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: password,
    // database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
});

function init() {
    inquirer.prompt({
        name: "initialize",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role"]
    })
    .then(function(res) {
        switch (res.initialize) {
            case "Add Department":
                addDepartment();
                break;
            
            // case "Add Role"
        }
    })
}