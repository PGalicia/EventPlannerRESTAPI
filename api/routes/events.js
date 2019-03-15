const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();

// Import: Middleware
const checkFormatGuest = require("./../middleware/checkFormatGuest");
const checkFormatEvent = require("./../middleware/checkFormatEvent");

// Imports: Models
const Event = require("./../models/event");
const Guest = require("./../models/guest");
const Item = require("./../models/item");
const EventGuest = require("./../models/eventGuest");
const EventItem = require("./../models/eventItem");
const AssignedItem = require("./../models/assignedItem");

// Association
// Event.Guest = Guest.belongsToMany(Event, { 
//     // as: "event_guest",
//     foreignKey: "eventId", 
//     otherKey: "guestId",
//     through: EventGuest
// });

// Event.belongsToMany(Guest, { 
//     // as: "event_guest",
//     foreignKey: "guestId",
//     otherKey: "eventId", 
//     through: EventGuest
// });

// Guest.belongsToMany(Event, { 
//     // as: "event_guest",
//     foreignKey: "eventId", 
//     otherKey: "guestId",
//     through: EventGuest
// });

// Event_Guest
Event.belongsToMany(Guest, {
    foreignKey: "eventId", 
    otherKey: "guestId",
    through: EventGuest
});

Guest.belongsToMany(Event, { 
    // as: "event_guest",
    foreignKey: "guestId",
    otherKey: "eventId", 
    through: EventGuest
});

// Event_Item
// Event.belongsToMany(Item, { 
//     foreignKey: "eventId", 
//     otherKey: "itemId",
//     through: EventItem
// });

// Item.belongsToMany(Event, { 
//     foreignKey: "itemId", 
//     otherKey: "eventId",
//     through: EventItem
// });

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
        - On HTTP GET request, it will retrieve event information
        including information associated with that event
        such as Guest, and Item.
        - On HTTP PATCH request, it will only change the main
        information under the event such as the name of the event,
        or location. It CANNOT change Guest's or Item's information.
        - On HTTP POST request, it will add the main information under
        the event such as the name of the event, or location. In addition,
        it will automatically add the guest as the possible attendees for 
        that event.
        - On HTTP DELETE request, it will delete the rows with the specified
        id in EVENT, ASSIGNEDITEM, and EVENTGUEST
*/

// GET all events
router.get("/", (req, res, next) => {

    console.log("Fetching all events");

    Event.findAll({
        include: [{
            model: Guest,
            through: {
                attributes: [],
                /*
                    The attribute below are used to
                    only show which ones are going
                */
                // where: {
                //     isGoing: 1
                // }
            }
        }, {
            model: AssignedItem
        }]
    })
        .then(e => {
            // res.status(200).json(e[0].assignedItems);
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
    
    Event.findOne({
        where: {
            rowid: eventId
        },
        include: [{
            model: Guest,
            through: {
                attributes: []
            }
        }, {
            model: AssignedItem
        }]
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

    let newEventId = null;

    Event.create({
        name: req.body.name
    })
        .then(result => {
            newEventId = result.rowid;
            return Guest.findAll({
                attributes: [["rowid", "guestId"]],
                raw: true
            })
        })
        .then(guests => {
            for(let guest of guests) {
                guest.isGoing = 0;
                guest.eventId = newEventId;
            }
            return guests;
        })
        .then(guests => {
            for(let guest of guests) {
                EventGuest.create(guest);
            }
        })
        .then(() => {
            res.status(201).json({
                message: "Event is succesfull created"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

// PATCH the event with the specified "eventId"
router.patch('/:eventId', checkFormatEvent, (req, res, next) => {
    const rowid = req.params.eventId;
    const query = req.query;
    console.log(`Fetching event ${rowid}`);
    
    Event.update(query, {
        where: {
            rowid
        }
    })
        .then(e => {
            res.status(200).json({
                message: "Updated Succesfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

// DELETE the event with the specified "eventId"
router.delete('/:eventId', (req, res, next) => {
    
    const rowid = req.params.eventId;
    
    Event.destroy({
        where: {
            rowid
        }
    })
        .then(() => {
            EventGuest.destroy({
                where: {
                    eventId: rowid
                }
            })
        })
        .then(() => {
            AssignedItem.destroy({
                where: {
                    eventId: rowid
                }
            })
        })
        
        .then(e => {
            res.status(200).json({
                message: `event ${rowid} is deleted from EVENT, ASSIGNEDITEM, and EVENTGUEST`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;