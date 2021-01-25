const User = require('../models/User');

// const search_user = async (req, res, next) => {
//     const { fname, surname, phoneNumber } = req.body;

//     try {
//         const user = await User.findOne({ fname, surname, phoneNumber });
//         console.log(user);
//         // res.status(201).json({ fname: sUser.fname, surname: sUser.surname, phoneNumber: sUser.phoneNumber });
//         res.status(201).json({ id: user._id, fname: user.fname, surname: user.surname, birthDate: user.birthDate, race: user.race, planet: user.planet });
//     }
//     catch(err) {
//         console.log(err);
//     }
// };

const search_user = async (req, res, next) => {
    const { fname, surname, phoneNumber } = req.body;

    try {
        const user = await User.find(fname, surname).sort({ createdAt: -1 });
        console.log(user);
        // res.status(201).json({ fname: sUser.fname, surname: sUser.surname, phoneNumber: sUser.phoneNumber });
        res.status(201).json({ id: user._id, fname: user.fname, surname: user.surname, birthDate: user.birthDate, race: user.race, planet: user.planet });
    }
    catch(err) {
        console.log(err);
    }
};

module.exports = {
    search_user
};