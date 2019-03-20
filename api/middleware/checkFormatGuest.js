/*
    Description: 
*/

module.exports = (req, res, next) => {
    // Get IsGoing property
    const isGoing = Number.parseInt(req.params.isGoing);

    const validValues = [0, 1];

    /*
        The last number of the path should have the following restriction:
            - Value can only be '1' or '0'
    */

    // If it DOES NOT meet the following restrictions, throw an error
    if(!(validValues.includes(Number.parseInt(isGoing)))) {
        next(Error(`Your isGoing value '${isGoing}' is not valid. It either needs to be '1' or '0'`));
    }

    // If valid
    next();

}