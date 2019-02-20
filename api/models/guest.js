const Sequelize = require('sequelize');
const db = require("./../../utils/connection");
const Event = require("./event");

const Guest = db.define('guest', {
    guestId: { type:Sequelize.INTEGER, primaryKey:true, autoIncrement: true },
    guestName: { type: Sequelize.STRING }
}, {
    timestamps: false
});

module.exports = Guest;