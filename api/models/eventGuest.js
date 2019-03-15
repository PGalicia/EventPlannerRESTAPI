const Sequelize = require("sequelize");
const db = require("./../../utils/connection");

module.exports = db.define('event_guest', {
    isGoing: { type:Sequelize.BOOLEAN, defaultValue: false}
}, {
    timestamps: false,
    freezeTableName: true
});