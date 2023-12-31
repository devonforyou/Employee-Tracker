const mysql = require('mysql2');
const userPrompt = require('./lib/user-prompt');

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