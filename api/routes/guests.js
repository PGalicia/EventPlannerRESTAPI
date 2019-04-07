const express = require("express");
const router = express.Router();

/* 
    Imports
*/

// Middleware
const checkFormatGuest = require("./../middleware/checkFormatGuest");

// Models
const Event = require("./../models/event");
const Guest = require("./../models/guest");
const Item = require("./../models/item");
const EventGuest = require("./../models/eventGuest");
const AssignedItem = require("./../models/assignedItem");

/*
    Associations
*/

// Event_Guest
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

// Assigned_Item
Event.hasMany(AssignedItem, {
    foreignKey: "eventId"
});

Guest.hasMany(AssignedItem, {
    foreignKey: "guestId"
});

Item.hasMany(AssignedItem, {
    foreignKey: "itemId"
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
    let rowIdList = [];
    let row = null;

    EventGuest.update({isGoing}, {
        where: {
            eventId,
            guestId
        }
    })
        .then(() => {
            return AssignedItem.findAll({
                where: {
                    eventId,
                    guestId
                },
                raw: true
            })
        })
        .then(allocatedItems => {
            // ONLY do this action if isGoing is set to false(0)
            if (isGoing === 1) { return; }
            // Store all the returned rowid
            console.log(allocatedItems);
            row = allocatedItems[0];
            for(let row of allocatedItems) {
                rowIdList.push(row.rowid);
            }
            console.log(rowIdList);
            // Change the first guestId to null and Delete everything else

            for(let id = 0; id < rowIdList.length; id++) {
                // For the first item in the list
                // update the guestId to null
                if(id === 0) {
                    AssignedItem.update({guestId: null}, {
                        where: {
                            rowid: rowIdList[id]
                        }
                    });
                    continue;
                }
                // For the rest, delete it
                AssignedItem.destroy({
                    where: {
                        rowid: rowIdList[id]
                    }
                })
            }
        })
        .then(() => {
            if (isGoing === 1) { return; }
            return AssignedItem.findAll({
                where: {
                    eventId,
                    itemId: row.itemId
                },
                raw: true
            })
        })
        .then(allocatedItems => {
            if (isGoing === 1) { return; }
            if(allocatedItems.length > 1) {
                AssignedItem.destroy({
                    where: {
                        rowid: rowIdList[0]
                    }
                })
            }
        })
        .then(() => {
            // res.status(200).json(e);
            res.status(200).json({
                message: "Updated Succesfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    // Find the guest in a particular event
    // then toggle their "isGoing" property
    // Look at the assignedItem table
    // Check how many items the now notAttending guest are assigned with
    // If there's none, just move on
    // If there's only one change "guestId" to null
    // If there's multiple, still change one guestId to null then remove the rest
});

module.exports = router;