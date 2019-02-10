const express = require("express");
const app = express();

const helloRoutes = require("./api/routes/hello");

app.use("/hello", helloRoutes);

module.exports = app;