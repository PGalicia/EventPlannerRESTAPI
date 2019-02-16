const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./utils/connection");

// routes
const helloRoutes = require("./api/routes/hello");
const eventsRoutes = require("./api/routes/events");

app.use(morgan("dev"));

// Check connection
db
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use("/events", eventsRoutes);

module.exports = app;