const User = require('../models/User');

const bothNames = (first, second) => {

    const user = await User.find( { fname: [first, second], surname: [second, first] }).select('fname surname email phoneNumber sex race').lean();

    console.log(user);
    res.status(201).json({ numOfResults: user.length , result: user });
};

module.exports = {
    bothNames
};