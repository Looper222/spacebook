const User = require('../models/User');
const { generateArray } = require('../middleware/searchMiddleware');
const { isMobilePhone } = require('validator');

const search_user = async (req, res, next) => {
    const { phrase, token } = req.body;
    console.log(phrase);

    try {
        // creating array pf words splitted by blank space (spacebar)
        if (phrase.includes(' ')) {
            console.log('ma');
            const phraseValues = phrase.split(' ');
            const fname = phraseValues[0];
            const surname = phraseValues[1];

        // find values in db
            const user = await User.find({ fname, surname });

            const searchedUsers = generateArray(user);
            const numOfResults = searchedUsers.length;

        // response array with valid users
            res.status(201).json({
                numOfResults: numOfResults,
                searchResults: searchedUsers
            });
        } else {
            console.log('nie ma');
            console.log(phrase.length);
            if (isMobilePhone(phrase))
            res.status(400).json('Jest tylko jedno słowo');
        }


    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    search_user
};