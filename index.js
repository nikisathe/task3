const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const college_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "college"
});

college_connection.connect((error) => {
    if (error) {
        console.error("Error while connecting to college database:", error);
        process.exit(1);
    } else {
        console.log("College database connected");
    }
});

const student_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "PREC01"
});

student_connection.connect((error) => {
    if (error) {
        console.error("Error while connecting to student database:", error);
        process.exit(1);
    } else {
        console.log("Student database connected");
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/student_login.html', (req, res) => {
    res.sendFile(__dirname + "/student_login.html");
});

app.post('/check', (req, res) => {
    const college_code = req.body.college_code;
    const query = "SELECT * FROM college_list WHERE college_code=?";
    
    college_connection.query(query, [college_code], (err, results) => {
        if (err) {
            console.error("Error while performing Query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: "college code not found!" });
            return;
        }

        res.redirect('/student_login.html');
    });
});

app.post("/login", (req, res) => {
    const stud_username = req.body.stud_username;
    const stud_password = req.body.stud_password;

    const query = 'SELECT * FROM student WHERE stud_username = ? and stud_password = ?';

    student_connection.query(query, [stud_username, stud_password], (err, result) => {
        if (err) {
            console.error("error executing student query", err);
            res.status(500).json({ message: "internal server error" });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: "student data not found" });
            return;
        }

        res.status(200).json(result[0]);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});