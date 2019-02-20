const Sequelize = require('sequelize');
const db = require("./../../utils/connection");

const EventGuest = db.define('eventGuest', {}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = EventGuest;