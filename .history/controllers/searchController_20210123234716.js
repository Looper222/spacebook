const User = require('../models/User');

const search_user = async (req, res, next) => {
    const { fname, surname, phoneNumber } = req.body;

    try {

    }
    catch(err) {
        console.log(err);
    }
};

module.exports = {
    search_user
};