const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { idFromCookie, idFromToken } = require('../middleware/componentsMiddleware');

/**
 * Search user in DB
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const search_user = async (req, res) => {
    const { phrase } = req.body;

    try {
         if (phrase.includes(' ')) {
            const splittedPhrase = phrase.split(' ');
            const first = new RegExp(`${splittedPhrase[0]}`, 'i');
            const second = new RegExp(`${splittedPhrase[1]}`, 'i');

            const user = await User.find( { fname: [first, second], surname: [second, first] }).select('_id fname surname').lean();

            console.log(user);
            res.status(201).json({ numOfResults: user.length , result: user });
         } else  {
            const sWord = new RegExp(`${phrase}`, 'i');
            let user = await User.find({ fname: { $regex: sWord } }).select('_id fname surname').lean();
            if (user.length === 0) {
                user = await User.find({ surname: { $regex: sWord } }).select('_id fname surname').lean();
                if  (user.length === 0 && phrase.length >= 9) {
                    user = await User.find({ phoneNumber: phrase }).select('_id fname surname phoneNumber').lean();
                }
            }
            let recordsCount = user.length;
            if (user.length === 0) {
                user = 'User not found';
                recordsCount = 0;
            }

            console.log(user);
            res.status(201).json({ numOfResults: recordsCount, result: user });
         }

    } catch (err) {
        console.log(err);
    }
};

/**
 * Get user info
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const get_user = async (req, res) => {
    // idFromCookie(req);
    const tk = req.header('authorization');
    // console.log(tk);
    idFromToken(tk);
    // const userID = req.header('authorization');

    try {
        const user = await User.findById(userID).select('fname surname email phoneNumber gender').lean();

        console.log(user);
        res.status(201).json({ user: user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ info: 'Something went wrong'});
    }
};

/**
 * Get user info
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const get_another_user = async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await User.findById(userID).select('fname surname email phoneNumber gender').lean();

        console.log(user);
        res.status(201).json({ user: user });
    } catch (err) {
        console.log(err);
    }
};

const get_user_short = async (userID) => {
    try {
        const user = await User.findById(userID).select('fname surname email');
        return user;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Controller including functions with user search operations
 */
module.exports = {
    search_user,
    get_user,
    get_another_user,
    get_user_short
};