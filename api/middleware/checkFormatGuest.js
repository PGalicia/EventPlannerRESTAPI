/*
    Description: Check that the user inputs with the guests adheres to the format given below
        and if so, next()
            else, throw an error
    Valid Attributes:
        - guestName: String
        - isGoing: Boolean

    Format:
        [
            { guestName: "Chandler", isGoing: true }
        ]
*/

module.exports = (req, res, next) => {
    const guests = req.body.guest;
    
    const validAttributes = ["guestName", "isGoing"];

    // If 'guests' is not an array throw an error
    if(!Array.isArray(guests)) { next(Error("The guest list given is not an array")); }

    
    // For each item in the array, ...
    for(let guest of guests) {
        
        let attributes = Object.keys(guest);
        
        for(let attribute of attributes) {
            // ... check if each attribute is valid
            if(!validAttributes.includes(attribute)) { 
                next(Error(`${attribute} is not a valid attribute for Guest. Valid attributes are ${validAttributes}`))
            }
        }
    }

    // If valid
    next();


}