const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const figlet = require('figlet');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
}
);


db.connect((err) => {
    // Throwing an error message if unsuccessful
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }

figlet("Employee Tracker", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);

    init();
    })
})

function init() {
    userPrompt(db)
}