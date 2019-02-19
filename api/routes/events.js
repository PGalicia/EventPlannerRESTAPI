const express = require("express");
const router = express.Router();

const event = require("./../models/event");

// GET all events
router.get("/", (req, res, next) => {
    
    console.log("Fetching all events");
    
    event.findAll()
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

// GET the event with specified the "id"
router.get("/:eventId", (req, res, next) => {
    
    const eventId = req.params.eventId;

    console.log(`Fetching event ${eventId}`);
    
    event.findAll({
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

// POST a new event
router.post("/", (req, res, next) => {

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

// PATCH the event with the specified "eventId"
router.patch('/:eventId', (req, res, next) => {
    const eventId = req.params.eventId;

    console.log(`Fetching event ${eventId}`);
    
    event.findOne({
        where: {
            eventId
        }
    })
        .then(e => {
            res.status(e).json({
                message: "Event updated!"
            })
        })
});

// DELETE the event with the specified "eventId"
router.delete('/:eventId', (req, res, next) => {
    
    const eventId = req.params.eventId;
    
    event.destroy({
        where: {
            eventId
        }
    })
        .then(e => {
            res.status(200).json({
                message: `event ${eventId} is deleted from database`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;