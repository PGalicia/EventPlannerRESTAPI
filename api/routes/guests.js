const express = require("express");
const router = express.Router();

// Import: Middleware
// const checkFormatGuest = require("./../middleware/checkFormatGuest");

// Imports: Models
const Event = require("./../models/event");
const Guest = require("../models/guest");
const EventGuest = require("./../models/eventGuest");

// Association
// Event.Guest = Guest.belongsToMany(Event, { 
//     as: "guests",
//     foreignKey: "eventId", 
//     otherKey: 'guestId',
//     through: EventGuest
// });

// Event.belongsToMany(Guest, { 
//     // as: "event_guest",
//     foreignKey: "guestId",
//     otherKey: "eventId", 
//     through: EventGuest
// });

// GET all events
router.get("/", (req, res, next) => {

    console.log("Fetching all guests");

    Guest.findAll()
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;