const User = require('../models/User');

const add_friend = async (req, res) => {
    const { friendID } = req.body;

    const friend = await User.findById(friendID).select('_id fname surname').lean();

    console.log(user);
    res.status(201).json({ result: user });
};