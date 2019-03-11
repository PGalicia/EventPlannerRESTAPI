const db = require("./../../utils/connection");

module.exports = db.define('event_guest', {}, {
    timestamps: false,
    freezeTableName: true
});