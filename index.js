const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;
//college code database
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

//prec student database
const student_connection_prec01 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "PREC01"
});

student_connection_prec01.connect((error) => {
    if (error) {
        console.error("Error while connecting to PREC student database:", error);
        process.exit(1);
    } else {
        console.log("PREC Student database connected");
    }
});
//Amrt student database
const student_connection_amrt12 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "AMRT12"
});

student_connection_amrt12.connect((error) => {
    if (error) {
        console.error("Error while connecting to AMRT student database:", error);
        process.exit(1);
    } else {
        console.log("AMRT Student database connected");
    }
});
//pvp student database
const student_connection_pvp45 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "pvp45"
});

student_connection_pvp45.connect((error) => {
    if (error) {
        console.error("Error while connecting to pvp student database:", error);
        process.exit(1);
    } else {
        console.log("pvp Student database connected");
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/student_login.html', (req, res) => {
    res.sendFile(__dirname + "/student_login.html");
});
//college validation
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

//student validations
app.post("/login", (req, res) => {
    const stud_username = req.body.stud_username;
    const stud_password = req.body.stud_password;

    const query_prec01 = 'SELECT * FROM student WHERE stud_username = ? and stud_password = ?';
    const query_amrt12 = 'SELECT * FROM student WHERE stud_username = ? and stud_password = ?';
    const query_pvp45 = 'SELECT * FROM student WHERE stud_username = ? and stud_password = ?';

    //prec student login validation
    student_connection_prec01.query(query_prec01, [stud_username, stud_password], (err, result_prec01) => {
        if (err) {
            console.error("error executing PREC01 student query", err);
            res.status(500).json({ message: "internal server error" });
            return;
        }

        if (result_prec01.length > 0) {
            res.status(200).json(result_prec01[0]);
            return;
        }
      //Amrt student login validation
        student_connection_amrt12.query(query_amrt12, [stud_username, stud_password], (err, result_amrt12) => {
            if (err) {
                console.error("error executing AMRT12 student query", err);
                res.status(500).json({ message: "internal server error" });
                return;
            }

            if (result_amrt12.length > 0) {
                res.status(200).json(result_amrt12[0]);
                return;
            }
  //pvp student validation
            student_connection_pvp45.query(query_pvp45, [stud_username, stud_password], (err, result_pvp45) => {
                if (err) {
                    console.error("error executing pvp45 student query", err);
                    res.status(500).json({ message: "internal server error" });
                    return;
                }

                if (result_pvp45.length > 0) {
                    res.status(200).json(result_pvp45[0]);
                    return;
                }

                res.status(404).json({ error: "student data not found" });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});