const User = require('../models/User');
const { idFromCookie, idFromToken } = require('../middleware/componentsMiddleware');

/**
 * Add friends to user's friends list
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const add_friend = async (req, res) => {
    // idFromCookie(req);
    const tk = req.header('authorization');
    const { friendID } = req.body;

    if (tk) {
        idFromToken(tk);

        try {
            const friend = await User.findById(friendID).select('_id fname surname').lean();

            const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { friends: friend }}, {useFindAndModify: false}, function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).json({ operationStatus: 'Failed', userID: userID, friendID: friendID });
                } else {
                    res.status(201).json({ operationStatus: 'Completed', userID: result._id, friendID: friend._id});
                }
            });
        } catch (err) {
            console.log(err);
            res.status(400).json('Attempt failed');
        }
    } else {
        res.status(400).json({ error: 'Token is empty'});
    }
};

/**
 * Get user's friends list
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const get_friends = async (req, res) => {
    // idFromCookie(req);
    const tk = req.header('authorization');

    if (tk) {
        idFromToken(tk);

        try {
            const friendsList = await User.findById(userID).select('_id friends').lean();
            console.log(friendsList);
            res.status(201).json({ userID: friendsList._id , numOfFriends: friendsList.friends.length , friends: friendsList.friends });
        } catch (err) {
            console.log(err);
            res.status(400).json('Attempt failed');
        }
    } else {
        res.status(400).json({ error: 'Token is empty'});
    }
};

/**
 * Delete record from user's friends list
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const delete_friend = async (req, res) => {
    // idFromCookie(req);
    const tk = req.header('authorization');
    const { friendID } = req.body;

    if (tk) {
        idFromToken(tk);

        try {
            const user = await User.findOneAndUpdate({ _id: userID }, { $pull: { friends: { _id: friendID }}}, { useFindAndModify: false }, function(err, result) {
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
    } else {
        res.status(400).json({ error: 'Token is empty'});
    }
};

/**
 * Controller including functions with user's friends control operations
 * @module controllers/friendsController
 */
module.exports = {
    add_friend,
    get_friends,
    delete_friend
}