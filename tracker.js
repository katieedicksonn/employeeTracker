const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "trackDB"
});
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Hello! select one",
            choices: [
                "View All Employees",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role", ,
            ],
            loop: false

        }]).then(function (answer) {
            switch (answer.choice) {
                case "View All Employees":

                    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee`,
                        function (err, res) {
                            if (err) {
                                throw err;
                            }
                            console.table(res);
                            runSearch();
                        });
                    break;
                case "Add Employee":
                    inquirer.prompt([
                        {
                            name: "firstName",
                            message: "What is employees first name?",
                            type: "input",

                        },
                        {
                            name: "lastName",
                            message: "What is the last name of your employee?",
                            type: "input",
                        },
                        {
                            name: "role",
                            type: "input",
                            message: "What is this employees role?"
                        },

                    ]).then(function (response) {
                        connection.query(`INSERT INTO employee set ?`, {
                            first_name: response.firstName,
                            last_name: response.lastName,
                            role_id: response.role
                        }, function (err, res) {
                            if (err) {
                                throw err;
                            }
                            runSearch();

                        });
                    
                    });
                    break;
// prompt asking what user should do
// add employee view all add role, add department, update employee role
// add employee ask first name last name id department and role and id number
// only can choose from the departnemnts and roles that have been created
