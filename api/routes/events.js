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
router.get("/:id", (req, res, next) => {
    
    const eventId = req.params.id;

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

module.exports = router;