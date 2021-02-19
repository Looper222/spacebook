const User = require('../models/User');
// const { bothNames } = require('../middleware/newSearchMiddleware');

const new_search_user = async (req, res) => {
    //const { phrase, sur } = req.body;
    const { phrase } = req.body;

    try {
        // const user = await User.find( { fname: [phrase, sur] }).select('fname surname email phoneNumber sex race').lean();
         if (phrase.includes(' ')) {
            const splittedPhrase = phrase.split(' ');
            const first = splittedPhrase[0];
            const second = splittedPhrase[1];

            const user = await User.find( { fname: [first, second], surname: [second, first] }).select('fname surname email phoneNumber sex race').lean();

            console.log(user);
            res.status(201).json({ numOfResults: user.length , result: user });
         } else  {
             const user = await User.find({ fname: phrase }).select('fname surname email phoneNumber sex race').lean();
         }

    } catch (err) {
        console.log(err);
    }

};

module.exports = {
    new_search_user
};

