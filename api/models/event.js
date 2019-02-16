const Sequelize = require('sequelize');
const db = require("./../../utils/connection");

const Event = db.define('event', {
    eventId: { type:Sequelize.INTEGER, primaryKey:true },
    eventName: { type: Sequelize.STRING },
    eventLocation: { type: Sequelize.STRING },
    eventTime: { type: Sequelize.STRING }
})

module.exports = Event;