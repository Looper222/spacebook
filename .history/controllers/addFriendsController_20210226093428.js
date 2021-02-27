const User = require('../models/User');

const add_friend = async (req, res) => {
    const { friendID, userID } = req.body;

    try {
        const friend = await User.findById(friendID).select('_id fname surname').lean();

        console.log(friend)

        const user = await User.findOneAndUpdate({ _id: userID }, { $push: { friends: [friend] }}, {useFindAndModify: false}, function(err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(result)
                res.json(result);
            }
        });



        // const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { friends: friend }}, {useFindAndModify: false}, (error, success) => {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log(success)
        //     }
        // });

        // console.log('friend is: ', friend);
        // res.status(201).json({ friend: friend });
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    add_friend
}