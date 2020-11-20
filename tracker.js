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
    database: "emptrackdb"
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
                "View All Roles",
                "Add Department",
                "View Departments",
                "Update Employee Role", ,
            ],
            // loop: false

        }]).then(function (answer) {
            switch (answer.choice) {
                case "View All Employees":

                    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role FROM employee`,
                        function (err, answer) {
                            if (err) {
                                throw err;
                            }
                            console.table(answer);
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

                    ]).then(function (answer) {
                        connection.query(`INSERT INTO employee set ?`, {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role: answer.role
                        }, function (err, answer) {
                            if (err) {
                                throw err;
                            }
                            runSearch();
                        });
                    });
                    break;
                case "Add Role":
                    inquirer.prompt([
                        {
                            name: "roleTitle",
                            type: "input",
                            message: "what is this roles title?"
                        },
                        {
                            name: "salary",
                            message: "what is the salary for this role?",
                            type: "input",

                        },
                        {
                            name: "depID",
                            type: "input",
                            message: "what is the department id number?"
                        }
                    ]).then(function (answer) {
                        connection.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", [answer.roleTitle, answer.salary, answer.depID], function (err, res) {
                            if (err) throw err;
                            runSearch();
                        })
                    })
                    break;
                    case "View All Roles":

                        connection.query(`SELECT role.title, role.salary, department_id FROM role`,
                            function (err, answer) {
                                if (err) {
                                    throw err;
                                }
                                console.table(answer);
                                runSearch();
                            });
                        break;
                case "Add Department":
                        inquirer.prompt([
                            {
                                name: "depName",
                                type: "input",
                                message: "what is the name of the department?"
                            },
                        ])
                    .then(function (answer) {
                        connection.query("INSERT INTO department(department_name) VALUES (?)", [answer.depName], function (err, res) {
                            if (err) throw err;
                            console.table(answer)
                            runSearch()
                        })
                    })
                    break;
                    case "View Departments":
                        let query = "SELECT * FROM department";
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.table(res);
                            runSearch();
                        })


            };
        })
};
// prompt asking what user should do
// add employee view all add role, add department, update employee role
// add employee ask first name last name id department and role and id number
// only can choose from the departnemnts and roles that have been created
