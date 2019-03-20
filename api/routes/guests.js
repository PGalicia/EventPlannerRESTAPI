const express = require("express");
const router = express.Router();

/* 
    Imports
*/

// Middleware
const checkFormatGuest = require("./../middleware/checkFormatGuest");

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

// GET guest with the specified guestId in the specified eventId
router.get("/:eventId/:guestId", (req, res, next) => {
    console.log("Updating guest");

    const eventId = req.params.eventId;
    const guestId = req.params.guestId;

    EventGuest.find({
        where: {
            eventId,
            guestId
        }
    })
        .then(e => {
            res.status(200).json(e);
        })
        .catch(e => {
            res.status(500).json({
                error: err
            })
        });
    // Find the guest in a particular event
    // then toggle their "isGoing" property
});


// PATCH - toggle the chosen attendee. Choose if the attendee is attending or not
router.patch("/:eventId/:guestId/:isGoing", checkFormatGuest, (req, res, next) => {
    console.log("Updating guest");

    const eventId = req.params.eventId;
    const guestId = req.params.guestId;
    const isGoing = Number.parseInt(req.params.isGoing);

    EventGuest.update({isGoing}, {
        where: {
            eventId,
            guestId
        }
    })
        .then(e => {
            res.status(200).json({
                message: "Updated Succesfully"
            });
        })
        .catch(e => {
            res.status(500).json({
                error: err
            })
        });
    // Find the guest in a particular event
    // then toggle their "isGoing" property
});

module.exports = router;