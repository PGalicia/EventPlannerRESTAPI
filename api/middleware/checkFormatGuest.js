/*
    Description: Check if the path inputted is either '1'(true) or '0'(false)
*/

module.exports = (req, res, next) => {
    // Get IsGoing property
    const isGoing = Number.parseInt(req.params.isGoing);

    const validValues = [0, 1];

    // If it DOES NOT meet the following restrictions, throw an error
    if(!(validValues.includes(Number.parseInt(isGoing)))) {
        next(Error(`Your isGoing value '${isGoing}' is not valid. It either needs to be '1' or '0'`));
    }

    // If valid
    next();

}