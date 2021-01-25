const User = require('../models/User');
const { generateArray } = require('../middleware/searchMiddleware');

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