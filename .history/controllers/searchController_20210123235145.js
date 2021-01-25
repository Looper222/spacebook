const User = require('../models/User');

const search_user = async (req, res, next) => {
    const { fname, surname, phoneNumber } = req.body;

    try {
        const sUser = await User.find({ fname, surname, phoneNumber });
        res.status(201).json({ fname: sUser.fname, surname: sUser.surname, phoneNumber: sUser.phoneNumber });
    }
    catch(err) {
        console.log(err);
    }
};

module.exports = {
    search_user
};