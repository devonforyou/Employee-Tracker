const inquirer = require('inquirer');

const Table = require('cli-table3');

function userPrompt(db) {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Select a choice:",
            choices: [
                "View all employees",
                "Add employee",
                "Update employee role",
                "View all roles",
                "Add role",
                "View all departments",
                "Add department",
                "Quit",
            ],
        })
        .then((answers) => {
            switch (answers.menu) {
                case "View all employees":
                    viewAllEmployees(db);
                    break;
                case "Add employee":
                    addEmployee(db);
                    break;
                case "Update employee role":
                    updateEmployeeRole(db);
                    break;
                case "View all roles":
                    viewAllRoles(db);
                    break;
                case "Add role":
                    addRole(db);
                    break;
                case "View all departments":
                    viewAllDepartments(db);
                    break;
                case "Add department":
                    addDepartment(db);
                    break;
                case "Quit":
                    console.log("Goodbye!");
                    process.exit();
                default:
                    console.log("Invalid choice.");
                    menu(db);
            }
        });
}

// Query Functions
function viewAllEmployees(db) {
    const query = `
        SELECT 
            e.id AS 'Employee ID',
            e.first_name AS 'First Name',
            e.last_name AS 'Last Name',
            r.title AS 'Title',
            d.name AS 'Department',
            r.salary AS 'Salary',
            IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'N/A') AS 'Manager'
        FROM employees e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
        ORDER BY e.id
    `;

    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
        }

        // Create a results Table using the 'cli-table3' library
        const table = new Table({
            head: ['Employee ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
            colWidths: [13, 12, 12, 30, 15, 10, 20],
        });

        // Push data rows to the table
        for (const row of res) {
            table.push([
                row['Employee ID'],
                row['First Name'],
                row['Last Name'],
                row['Title'],
                row['Department'],
                row['Salary'],
                row['Manager'],
            ]);
        }

        // Print the table
        console.log(table.toString());
        console.log();
        userPrompt(db);
    });
}

function addEmployee(db) {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Enter the employee's first name:",
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter the employee's last name:",
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter the employee's role ID:",
            },
            {
                name: "manager_id",
                type: "input",
                message: "Enter the employee's manager's ID (if applicable, or press Enter for none):",
            },
        ])
        .then((answers) => {
            const { first_name, last_name, role_id, manager_id } = answers;
            const query = `
                INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?);
            `;

            db.query(query, [first_name, last_name, role_id, manager_id], (err, res) => {
                if (err) {
                    console.error("Error adding employee:", err);
                } else {
                    console.log("Employee added successfully.");
                }
                userPrompt(db);
            });
        });
}

function updateEmployeeRole(db) {
    inquirer
        .prompt([
            {
                name: "employee_id",
                type: "input",
                message: "Enter the ID of the employee whose role you want to update:",
            },
            {
                name: "new_role_id",
                type: "input",
                message: "Enter the new role ID for the employee:",
            },
            {
                name: "new_manager_id",
                type: "input",
                message: "Enter the employee's new manager's ID:",
            },
        ])
        .then((answers) => {
            const { employee_id, new_role_id, new_manager_id } = answers;
            const query = `
                UPDATE employees
                SET role_id = ?, manager_id = ?
                WHERE id = ?;
            `;

            db.query(query, [new_role_id, new_manager_id, employee_id], (err, res) => {
                if (err) {
                    console.error("Error updating employee role:", err);
                } else if (res.affectedRows === 0) {
                    console.log("Employee not found with that ID.");
                } else {
                    console.log("Employee role updated successfully.");
                }
                userPrompt(db);
            });
        });
}

function viewAllRoles(db) {
    const query = `SELECT * FROM roles`;
    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
        }

        const table = new Table({
            head: ['Role ID', 'Title', 'Salary', 'Department ID'],
            colWidths: [10, 30, 10, 15],
        });

        for (const row of res) {
            table.push([
                row['id'],
                row['title'],
                row['salary'],
                row['department_id'],
            ]);
        }

        console.log(table.toString());
        console.log();
        userPrompt(db);
    });
}

function addRole(db) {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the role title:",
            },
            {
                name: "salary",
                type: "input",
                message: "Enter the role salary:",
            },
            {
                name: "department_id",
                type: "input",
                message: "Enter the department ID for this role:",
            },
        ])
        .then((answers) => {
            const { title, salary, department_id } = answers;
            const query = `
                INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?);
            `;

            db.query(query, [title, salary, department_id], (err, res) => {
                if (err) {
                    console.error("Error adding role:", err);
                } else {
                    console.log("Role added successfully.");
                }
                userPrompt(db);
            });
        });
}

function viewAllDepartments(db) {
    const query = `SELECT * FROM departments`;
    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
        }

        const table = new Table({
            head: ['Department ID', 'Name'],
            colWidths: [15, 30],
        });

        for (const row of res) {
            table.push([
                row['id'],
                row['name'],
            ]);
        }

        console.log(table.toString());
        console.log();
        userPrompt(db);
    });
}

function addDepartment(db) {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the department name:",
            },
        ])
        .then((answers) => {
            const { name } = answers;
            const query = `
                INSERT INTO departments (name)
                VALUES (?);
            `;

            db.query(query, [name], (err, res) => {
                if (err) {
                    console.error("Error adding department:", err);
                } else {
                    console.log("Department added successfully.");
                }
                userPrompt(db);
            });
        });
}

module.exports = userPrompt;