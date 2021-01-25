const User = require('../models/User');

const pullOutValues = (user) => {
    user.forEach(e => {
         { id: e._id, fname: e.fname, surname: e.surname, race: e.race, sex: e.sex, planet: e.planet };
    });
};

const generateArray = (user) = {

};

module.exports = {
    pullOutValues
};