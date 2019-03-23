/*
    Description: 
*/

module.exports = (req, res, next) => {
    // Get the all the information inputted in the body
    const bodyInfo = req.body;

    console.log(bodyInfo);
    // Check if the keys are all valid
    const validKeys = ["name"];

    // Check if the users even gave the right amount of values
    if(Object.keys(bodyInfo).length !== validKeys.length) {
        next(Error(`There should only be ${validKeys.length} field(s) in the body`));
    }

    // Check if each value of each key are valid (ie it should only be string)
    // not needed: just edit the model to have the restriction
    for(let key of Object.keys(bodyInfo)) {
        if(!validKeys.includes(key)) { next(Error(`The property '${key}' is not valid`)) }
    }

    // If valid
    next();

}