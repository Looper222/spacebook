const User = require('../models/User');
const { idFromCookie } = require('../middleware/componentsMiddleware');

/**
 * Add notification to user's notifications list
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const add_notif = async (req, res) => {
    idFromCookie(req);
    const { friendID, notifType } = req.body;
    const date = new Date().toDateString();

    const notif = {
        _id: friendID,
        notifType: notifType,
        creationDate: date
    };

    try {
        const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { notifs: notif }}, { useFindAndModify: false },
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).json({ operationStatus: 'Failed', userID: userID, friendID: friendID, notifType: notifType });
                } else {
                    res.status(201).json({ operationStatus: 'Completed', userID: userID, friendID: friendID });
                }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json('Attempt failed');
    }
};

/**
 * Remove notification from user's notifications list
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const remove_notif = async (req, res) => {
    idFromCookie(req);
    const { friendID } = req.body;

    try {
        const user = await User.findOneAndUpdate({ _id: userID }, { $pull: { notifs: { _id: friendID }}}, { useFindAndModify: false },
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).json({ operationStatus: 'Failed', userID: userID, friendID: friendID });
                } else {
                    res.status(201).json({ operationStatus: 'Completed', userID: result._id, deletedFriendID: friendID });
                }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json('Attempt failed');
    }
};

/**
 * Get notifications from user's notifications list
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const get_notifs = async (req, res) => {
    idFromCookie(req);

    try {
        const notifsList = await User.findById(userID).select('_id notifs').lean();
        res.status(201).json({ userID: userID , numOfNotifs: notifsList.notifs.length , notifs: notifsList.notifs });
    } catch (err) {
        console.log(err);
        res.status(400).json('Attempt failed');
    }
};

/**
 * Controller including functions with user's notifications control operations
 * @module controllers/notifController.js
 */
module.exports = {
    add_notif,
    remove_notif,
    get_notifs
};