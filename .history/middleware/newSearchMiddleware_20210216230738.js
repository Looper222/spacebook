const User = require('../models/User');

const bothNames = async (first, second) => {

    const user = await User.find( { fname: [first, second], surname: [second, first] }).select('fname surname email phoneNumber sex race').lean();

    console.log(user);
};

module.exports = {
    bothNames
};