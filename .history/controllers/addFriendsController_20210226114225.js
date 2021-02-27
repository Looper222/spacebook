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


module.exports = {
    add_friend
}