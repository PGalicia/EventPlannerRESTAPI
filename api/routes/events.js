const express = require("express");
const router = express.Router();

const event = require("./../models/event");

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

module.exports = router;