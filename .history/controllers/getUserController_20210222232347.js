const User = require('../models/User');

const get_user = async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await User.findById(userID).select('fname surname email phoneNumber sex race').lean();

        console.log(user);
        res.status(201).json({ user: user });
    } catch (err) {
        console.log(err);
    }
};