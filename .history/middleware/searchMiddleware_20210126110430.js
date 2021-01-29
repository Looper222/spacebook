const User = require('../models/User');

const generateArray = (user) => {
    const searchResults = [];

    user.forEach(e => {
        searchResults.push({
            id: e._id,
            fname: e.fname,
            surname: e.surname,
            phoneNumber: e.phoneNumber,
            race: e.race,
            sex: e.sex,
            planet: e.planet
        });
    });

    return searchResults;
};

module.exports = {
    generateArray
};