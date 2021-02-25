const User = require('../models/User');

const add_friend = async (req, res) => {
    const { friendID } = req.body;

    try {
        const friend = await User.findById(friendID).select('_id fname surname').lean();

        console.log(user);
        res.status(201).json({ result: user });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    add_friend
}