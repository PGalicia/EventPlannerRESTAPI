const db = require("./../../utils/connection");

module.exports = db.define('event_item', {}, {
    timestamps: false,
    freezeTableName: true
});