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
    // Get all the queries
    const queries = req.query;

    const validColumn = ["name"];

    /*
        Use this format later to send error
    */
    // JSON.parse(`
    //     {
    //         error: "${key}" is not a valid column,
    //         validColumns: ${validColumn.toString()}
    //     }
    // `);

    // Check if queries matches the attributes of event tables
    for(let key of Object.keys(queries)) {
        // If NOT valid, throw an error
        if(!validColumn.includes(key)) { next(Error(`'${key}' is not a valid column`)); }
    }

    // If valid
    next();

}