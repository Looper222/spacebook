const User = require('../models/User');

const add_notif = async (req, res) => {
    const { userID, friendID, notifType, content } = req.body;
    const date = new Date().toDateString();

    try {
        const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { notifs: { _id: friendID, notifType: notifType, creationDate: date, notifContent: content }}}, { useFindAndModify: false },
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).json({ operationStatus: 'Failed', userID: userID, friendID: friendID, notifType: notifType });
                } else {
                    res.status(201).json({ operationStatus: 'Completed', userID: result._id, friendID: friend._id});
                }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json('Attempt failed');
    }
};