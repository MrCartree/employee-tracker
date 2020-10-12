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
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "EXIT"]
    })
    .then(function(res) {
        switch (res.initialize) {
            case "Add Department":
                addDepartment();
                break;
            
            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;

            case "View Employees":
                viewEmployees();
                break;
            
            case "Update Employee Role":
                updateEmployee();
                break;

            case "EXIT":
                closeApp();
                break;
        }
    })
}

function addDepartment() {
    console.log("Hello from inside addDepartment()")
    init();
}

function addRole() {
    console.log("Hello from inside addRole()")
    init();
}

function addEmployee() {
    console.log("Hello from inside addEmployee()")
    init();
}

function viewDepartments() {
    console.log("Hello from inside viewDepartments()")
    init();
}

function viewRoles() {
    console.log("Hellow from inside viewRoles()")
    init();
}

function viewEmployees() {
    console.log("Hellow from inside viewEmployees()")
    init();
}

function updateEmployee() {
    console.log("Hello from inside updateEmployee()")
    init();
}

function closeApp() {
    inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "Are you sure you want to terminate this application?"
    }).then(function(res) {
        if (res.confirm === true) {
            connection.end();
        } else {
            init();
        }
    })
}