const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const password = require("./password");
// const { inherits } = require("util");

const connection = mysql.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: password,
    database: "employeeDB"
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
        .then(function (res) {
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
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the name of the department?"
    }).then(function (res) {
        connection.query(`INSERT INTO department (name) VALUES ('${res.department}')`, function (err, res) {
            if (err) throw err;
            console.log("Department has been added!");
            init();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: "roleTitle",
            type: "input",
            message: "What is the title of the role?"
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the base salary of the role?"
        },
        {
            name: "roleDepartment",
            type: "input",
            message: "What is the department this role is a part of?"
        }
    ]).then(function(res) {
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.roleTitle}', '${res.roleSalary}', '${res.roleDepartment}')`, function(err, res) {
            if (err) throw err;
            console.log("Role has been added!");
            init();
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "employeeFirstName",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "employeeRole",
            type: ""
        }
    ])
    init();
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        let table = cTable.getTable(res)
        console.log(table);
        init();
    })
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
    }).then(function (res) {
        if (res.confirm === true) {
            connection.end();
        } else {
            init();
        }
    })
}