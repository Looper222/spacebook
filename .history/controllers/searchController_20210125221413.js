const User = require('../models/User');
const { pullOutValues, generateArray } = require('../middleware/searchMiddleware');

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

// const search_user = async (req, res, next) => {
//     const { fname, surname, phoneNumber } = req.body;

//     try {
//         const user = await User.find({ fname, surname }).sort({ createdAt: -1 });
//         console.log(user);
//         const stringUser = JSON.stringify(user);
//         console.log(stringUser);
//         const juser = JSON.parse(stringUser);
//         console.log(juser);
//         // res.status(201).json({ fname: sUser.fname, surname: sUser.surname, phoneNumber: sUser.phoneNumber });
//         // res.status(201).res.json({ fname: juser[0].fname });
//         // json({ id: user._id, fname: user.fname, surname: user.surname, birthDate: user.birthDate, race: user.race, planet: user.planet });
//         res.status(201).json({ fname: juser.fname });
//     }
//     catch(err) {
//         console.log(err);
//     }
// };

const search_user = async (req, res, next) => {
    const { phrase, token } = req.body;
    console.log(phrase);

    try {
        // creating array pf words splitted by blank space (spacebar)
        const phraseValues = phrase.split(' ');
        const fname = phraseValues[0];
        const surname = phraseValues[1];

        // find values in db
        const user = await User.find({ fname, surname });

        // response array with valid users
        res.status(201).json({
            searchResults: generateArray(user)
        });

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    search_user
};