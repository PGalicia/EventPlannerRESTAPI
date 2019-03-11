const Sequelize = require('sequelize');
const db = require("./../../utils/connection");

module.exports = db.define('item', {
    rowid: { type:Sequelize.INTEGER, primaryKey:true, autoIncrement: true },
    name: { type: Sequelize.STRING }
}, {
    timestamps: false,
    freezeTableName: true
});