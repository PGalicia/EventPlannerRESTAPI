const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./utils/connection");

// routes
const helloRoutes = require("./api/routes/hello");
const eventsRoutes = require("./api/routes/events");

app.use(morgan("dev"));

app.use("/events", eventsRoutes);

module.exports = app;