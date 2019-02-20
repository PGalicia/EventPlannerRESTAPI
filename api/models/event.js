const Sequelize = require('sequelize');
const db = require("./../../utils/connection");
const Guest = require("./guest");

const Event = db.define('event', {
    eventId: { type:Sequelize.INTEGER, primaryKey:true, autoIncrement: true },
    eventName: { type: Sequelize.STRING },
    eventLocation: { type: Sequelize.STRING },
    eventTime: { type: Sequelize.STRING }
}, {
    timestamps: false
});

module.exports = Event;