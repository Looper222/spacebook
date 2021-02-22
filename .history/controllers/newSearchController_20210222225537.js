const User = require('../models/User');

const new_search_user = async (req, res) => {
    const { phrase } = req.body;

    try {
         if (phrase.includes(' ')) {
            const splittedPhrase = phrase.split(' ');
            const first = new RegExp(`${splittedPhrase[0]}`, 'i');
            const second = new RegExp(`${splittedPhrase[1]}`, 'i');

            const user = await User.find( { fname: [first, second], surname: [second, first] }).select('fname surname email phoneNumber sex race').lean();

            console.log(user);
            res.status(201).json({ numOfResults: user.length , result: user });
         } else  {
            const sWord = new RegExp(`${phrase}(\w)+`, 'g');
            let user = await User.find({ fname: sWord }).select('fname surname email phoneNumber sex race').lean();
            if (user.length === 0) {
                user = await User.find({ surname: sWord }).select('fname surname email phoneNumber sex race').lean();
                if  (user.length === 0 && phrase.length >= 9) {
                    user = await User.find({ phoneNumber: phrase }).select('fname surname email phoneNumber sex race').lean();
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