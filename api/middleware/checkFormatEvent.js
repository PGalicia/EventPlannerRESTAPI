/*
    Description: Check if the query inputted followed the format below
    Format: name=some+event&datetime=YYYY-MM-DD+HH:MM:SS&location=some+location
*/

module.exports = (req, res, next) => {
    // Get all the queries
    const queries = req.query;

    const validColumn = ["name", "datetime", "location"];

    // Check if queries matches the attributes of event tables
    for(let key of Object.keys(queries)) {
        // If NOT valid, throw an error
        if(!validColumn.includes(key)) { next(Error(`'${key}' is not a valid column`)); }
    }

    // If valid
    next();

}