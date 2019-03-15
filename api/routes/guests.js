const express = require("express");
const router = express.Router();

/* 
    Imports
*/

// Models
const Event = require("./../models/event");
const Guest = require("../models/guest");
const EventGuest = require("./../models/eventGuest");

Event.belongsToMany(Guest, {
    foreignKey: "eventId", 
    otherKey: "guestId",
    through: EventGuest
});

Guest.belongsToMany(Event, { 
    foreignKey: "guestId",
    otherKey: "eventId", 
    through: EventGuest
});

/*
    HTTP Requests

    Additional Notes:
        - On HTTP PATCH request, when a guest is not going to an event,
        the item associated with that guest (ie the guest is bringing food)
        is also terminated.
*/

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

// GET the potential attendees with the specified eventId
router.get("/:eventId", (req, res, next) => {

    console.log("Fetching all guests");

    const eventId = req.params.eventId;

    EventGuest.findAll({
        where: {
            eventId
        }
    })
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});


// PATCH - toggle the chosen attendee. Choose if the attendee is attending or not

module.exports = router;