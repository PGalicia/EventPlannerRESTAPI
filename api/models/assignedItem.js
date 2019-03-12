const Sequelize = require("sequelize");
const db = require("../../utils/connection");

// module.exports = db.define('event_guest_item', {}, {
//     timestamps: false,
//     freezeTableName: true
// });

module.exports = db.define('assignedItem', {
    rowid: { type:Sequelize.INTEGER, primaryKey:true, autoIncrement: true},
    eventId: { type:Sequelize.INTEGER },
    itemId: { type:Sequelize.INTEGER },
    guestId: { type:Sequelize.INTEGER, allowNull: true }
}, {
    timestamps: false,
    freezeTableName: true
});