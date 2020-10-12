let mysql = require("mysql");
let inquirer = require("inquirer");
let consoleTable = require("console.table");
// const { inherits } = require("util");

let connection = mysql.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: "Ih8p4ssw0rds!",
    // database: "employeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // init();
});