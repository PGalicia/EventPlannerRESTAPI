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
    // const event = {
    //     eventName: req.body.eventName,
    //     eventLocation: req.body.eventLocation,
    //     eventTime: req.body.eventTime
    // };

    const newEvent = event.build({
        eventName: req.body.eventName,
        eventLocation: req.body.eventLocation,
        eventTime: req.body.eventTime
    });

    newEvent.save()
        .then(e => {
            res.status(201).json(e);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;