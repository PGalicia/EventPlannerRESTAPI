const express = require("express");
const app = express();
const morgan = require("morgan");
const connection = require("./utils/connection");


const helloRoutes = require("./api/routes/hello");

app.use(morgan("dev"));

app.use("/hello", helloRoutes);

app.use("/users", (req, res) => {
    console.log("Fetching all users");

    const dbconnection = connection;

    const queryString = "SELECT * FROM actor LIMIT 10";

    dbconnection.query(queryString, (err, rows, fields) => {
        
        if(err) {
            console.log("Failed to fetch users" + err);
        }
        res.json(rows)
    })

})

module.exports = app;