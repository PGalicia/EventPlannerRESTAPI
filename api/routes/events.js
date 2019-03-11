const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();

// Import: Middleware
const checkFormatGuest = require("./../middleware/checkFormatGuest");

// Imports: Models
const Event = require("./../models/event");
const Guest = require("./../models/guest");
const EventGuest = require("./../models/eventGuest");

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
Event.belongsToMany(Guest, { 
    // as: "event_guest",
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

/*
    HTTP Requests
*/

// GET all events
// router.get("/", (req, res, next) => {

//     console.log("Fetching all events");

//     Event.findAll()
//         .then(e => {
//             res.status(200).json(e);
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// });
router.get("/", (req, res, next) => {

    console.log("Fetching all events");

    Event.findAll({
        include: [{
            model: Guest,
            through: {
                attributes: []
            },
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

// // GET the event with specified the "id"
// router.get("/:eventId", (req, res, next) => {
    
//     const eventId = req.params.eventId;

//     console.log(`Fetching event ${eventId}`);
    
//     Event.findAll({
//         where: {
//             eventId
//         }
//     })
//         .then(e => {
//             res.status(200).json(e);
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// });

// // POST a new event
// router.post("/", checkFormatGuest, (req, res, next) => {

//     Event.create({
//         eventName: req.body.eventName,
//         eventLocation: req.body.eventLocation,
//         eventTime: req.body.eventTime,
//         guests: req.body.guest

//     }, {
//         include: [{
//             association: Event.Guest,
//             model: Guest
//         }]
//     })
//         .then(e => {
//             res.status(201).json(e);
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         });
// });

// // PATCH the event with the specified "eventId"
// router.patch('/:eventId', (req, res, next) => {
//     const eventId = req.params.eventId;

//     console.log(`Fetching event ${eventId}`);

//     Event.update({
//         eventName: req.body.eventName
//     },{
//         returning: true,
//         where: {
//             eventId
//         }
//     })
//         .then(e => {
//             res.status(200).json(e)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         });
// });

// // DELETE the event with the specified "eventId"
// router.delete('/:eventId', (req, res, next) => {
    
//     const eventId = req.params.eventId;
    
//     Event.destroy({
//         where: {
//             eventId
//         }
//     })
//         .then(e => {
//             res.status(200).json({
//                 message: `event ${eventId} is deleted from database`
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// });

module.exports = router;