const express = require("express");
const router = express.Router();

const event = require("./../models/event");

// GET all events
router.get("/", (req, res, next) => {
    
    console.log("Fetching all events");
    
    event.findAll({
        attributes: ['eventId', 'eventName', "eventLocation", "eventTime"]
    })
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
});

// GET the event with specified the "id"
router.get("/:eventId", (req, res, next) => {
    
    const eventId = req.params.eventId;

    console.log(`Fetching event ${eventId}`);
    
    event.findAll({
        attributes: ['eventId', 'eventName', "eventLocation", "eventTime"],
        where: {
            eventId
        }
    })
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
});

router.post("/", (req, res, next) => {
    const event = {
        name: req.body.name,
        location: req.body.location
    };

    res.status(201).json({
        message: "Event is created",
        createdEvent: event
    });
});

module.exports = router;