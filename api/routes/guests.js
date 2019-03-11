const express = require("express");
const router = express.Router();

// Imports: Models
const Event = require("./../models/event");
const Guest = require("../models/guest");
const EventGuest = require("./../models/eventGuest");

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