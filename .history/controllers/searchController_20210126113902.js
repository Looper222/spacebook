const User = require('../models/User');
const { generateArray } = require('../middleware/searchMiddleware');
const { isMobilePhone } = require('validator');

const search_user = async (req, res, next) => {
    const { phrase, token } = req.body;

    try {
        // creating array pf words splitted by blank space (spacebar)
        if (phrase.includes(' ')) {
            const phraseValues = phrase.split(' ');
            let fname = phraseValues[0];
            let surname = phraseValues[1];

            // find values in db
            let user = await User.find({ fname, surname });

            let searchedUsers = generateArray(user);
            let numOfResults = searchedUsers.length;

            if (numOfResults == 0) {
                surname = phraseValues[0];
                fname = phraseValues[1];

                user = await User.find({ fname, surname });

                searchedUsers = generateArray(user);
                numOfResults = searchedUsers.length;
            }

            // response array with valid users
            res.status(201).json({
                numOfResults: numOfResults,
                searchResults: searchedUsers
            });
        } else {
            // search request by phoneNumber
            if (isMobilePhone(phrase) && phrase.length == 9) {
                const phoneNumber = phrase;

                try {
                    const user = await User.findOne({ phoneNumber });
                    const searchedUsers = { id: user._id, fname: user.fname, surname: user.surname, phoneNumber: user.phoneNumber, race: user.race, sex: user.sex, planet: user.planet };
                    const numOfResults = searchedUsers.length;

                    res.status(201).json({
                        numOfResults: numOfResults,
                        searchResults: searchedUsers
                })
                } catch (err) {
                    
                }
            }
            // else {
            //     res.status(400).json('Jest tylko jedno słowo i to nie numer');
            // }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    search_user
};