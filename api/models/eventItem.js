const Sequelize = require('sequelize');
const db = require("./../../utils/connection");

module.exports = db.define('event_item', {
    guestId: { type:Sequelize.INTEGER, allowNull: true }
}, {
    timestamps: false,
    freezeTableName: true
});