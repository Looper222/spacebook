const User = require('../models/User');

const new_search_user = async (req, res) => {
    const { phrase } = req.body;

    try {
         if (phrase.includes(' ')) {
            const splittedPhrase = phrase.split(' ');
            const first = splittedPhrase[0];
            const second = splittedPhrase[1];

            const user = await User.find( { fname: [first, second], surname: [second, first] }).select('fname surname email phoneNumber sex race').lean();

            console.log(user);
            res.status(201).json({ numOfResults: user.length , result: user });
         } else  {
            const word = new RegExp(`${phrase}`, 'i');
            let user = await User.find({ fname: word }).select('fname surname email phoneNumber sex race').lean();
            if (user.length === 0) {
                user = await User.find({ surname: phrase }).select('fname surname email phoneNumber sex race').lean();
                if  (user.length === 0 && phrase.length >= 9) {
                    user = await User.find({ phoneNumber: word }).select('fname surname email phoneNumber sex race').lean();
                }
            }

            console.log(user);
            res.status(201).json({ numOfResults: user.length, result: user });
         }

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    new_search_user
};