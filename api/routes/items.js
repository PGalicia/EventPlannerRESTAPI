const express = require("express");
const router = express.Router();

/* 
    Imports
*/

// Middleware

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
        - On HTTP POST request, it will add a row on the assignedItem
        table, and if the added item does not exist on the item table,
        it will add the new item there as well.
        - On HTTP DELETE request, it will delete the item on
        the assignedItem table and not in the Item table.

*/

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

// POST a new item in the specified event
// Check if 'eventId' exist, if so continue, if not throw error
// Check that item does not exist on the item table, if it exist, just move one
// If not, add item into the Item table
// Add row in the assigned Item table
router.post("/:eventId", (req, res, next) => {
    
    const rowid = req.params.eventId;
    const name = req.body.name.toLowerCase();
    
    console.log(`Creating a new item for event ${rowid}`);

    Event.findOne({
        where: {
            rowid
        }
    })
        .then(result => {
            // Error will be thrown id the event id specfied does not exist
            if(!result) {
                throw `The eventId (${rowid}) you specified does not exist`;
            }

            return Item.findOne({
                where: {
                    name
                }
            })
        })
        .then(result => {
            
            // If item does not exist, add it to the item table and find it's id
            if(!result) {
                Item.create({
                    name
                });
                return Item.findOne({
                    where: {
                        name
                    }
                });
            }
            return result;
        })
        .then(result => {
            return AssignedItem.create({
                eventId: rowid,
                itemId: result.rowid,
                guestId: null
            })
        })
        .then(e => {
            res.status(201).json({
                message: `'${name}' is succesfully added to event ${rowid}`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

// DELETE item from specified event
router.delete("/:eventId/:itemId", (req, res, next) => {
    // Check if eventId exist
    // Check if itemId exist
    // Find the appropriate id in the assignedItem
    // Delete

    const eventId = req.params.eventId;
    const itemId = req.params.itemId;

    console.log(`Deleting item ${itemId} from event ${eventId}`);

    AssignedItem.findOne({
        where: {
            eventId,
            itemId
        }
    })
        .then(result => {
            if(!result) {
                throw `Item ${itemId} and/or Event ${eventId} does not exist`;
            }
            AssignedItem.destroy({
                where: {
                    eventId,
                    itemId
                }
            });
        })
        .then(() => {
            res.status(200).json({
                message: `Item ${itemId} from Event ${eventId} is deleted from ASSIGNEDITEM`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        })
});

module.exports = router;