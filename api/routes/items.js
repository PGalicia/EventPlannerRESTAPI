const express = require("express");
const router = express.Router();

// Imports: Models
const Item = require("./../models/item");

// GET all events
router.get("/", (req, res, next) => {

    console.log("Fetching all items");

    Item.findAll()
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