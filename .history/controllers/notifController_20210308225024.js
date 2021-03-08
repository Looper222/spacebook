const User = require('../models/User');

const add_notif = async (req, res) => {
    const { userID, friendID, notifType } = req.body;
    const date = new Date().toDateString();

    const user = await User.findOneAndUpdate()
};