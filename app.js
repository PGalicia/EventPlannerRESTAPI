const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");

const helloRoutes = require("./api/routes/hello");

app.use(morgan("dev"));

app.use("/hello", helloRoutes);

app.use("/users", (req, res) => {
    console.log("Fetching all users");

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.PASSWORD,
        database: "sakila"
    })

    const queryString = "SELECT * FROM actor LIMIT 10";

    connection.query(queryString, (err, rows, fields) => {
        
        if(err) {
            console.log("Failed to fetch users" + err);
        }
        res.json(rows)
    })

})

module.exports = app;