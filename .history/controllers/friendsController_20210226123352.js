const User = require('../models/User');

const add_friend = async (req, res) => {
    const { friendID, userID } = req.body;

    try {
        const friend = await User.findById(friendID).select('_id fname surname').lean();

        const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { friends: friend }}, {useFindAndModify: false}, function(err, result) {
            if (err) {
                console.log(err);
                res.status(201).json({ operationStatus: 'Failed', userID: userID, friendID: friendID });
            } else {
                res.status(201).json({ operationStatus: 'Completed', userID: result._id, friendID: friend._id});
            }
        });
    } catch (err) {
        console.log(err);
    }
};

const get_friends = async (req, res) => {
    const { userID } = req.body;

    try {
        const friendsList = await User.findById(userID).select('_id friends').lean();
        console.log(friendsList);
        res.status(201).json({ userID: friendsList._id , numOfFriends: friendsList.friends.length , friends: friendsList.friends });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    add_friend,
    get_friends
}