const User = require('../models/User');

const change_status = async (cookieID, onlineStatus) => {
    const userID = cookieID;

    try {
        const user = await User.findOneAndUpdate({ _id: userID}, { $set: { onlineStatus: onlineStatus }}, {useFindAndModify: false}, function(err, result) {
            if (err) {
                console.log('Status-change: Failed');
                console.log(err);
            } else {
                console.log('Status-change: Completed');
            }
        });
    } catch (err) {
        console.log('Attempt failed');
        console.log(err);
    }
};

const trial_add_lastContacts = async (req, res) => {
    const { userID, contactID } = req.body;

    try {
        const array = [];
        array.unshift(contactID);
        const user = await User.findByIdAndUpdate({ _id: userID }, { $set: { lastContacts: array }}, {useFindAndModify: false}, (err, result) => {
            if (err) {
                console.log('Failed');
                console.log(err);
            } else {
                console.log('Completed');
            }
        });
        const showMe = await User.findById(userID).select('lastContacts').lean();
        const lContacts = showMe.lastContacts;
        console.log(lContacts);
    } catch (err) {
        console.log('Attempt failed');
        console.log(err);
    }
};

const get_lastContacts = async (cookieID) => {
    const userID = cookieID;

    try {
        const user = await User.findById(userID).select('lastContacts').lean();
        const lastContacts = user.lastContacts;
        // console.log(lastContacts);
        return lastContacts;
    } catch (err) {
        console.log(err);
    }
};

const update_lastContacts = async (cookieID, contactID) => {
    const userID = cookieID;

    try {
        const user = await User.findById(userID).select('lastContacts').lean();
        const lastContacts = user.lastContacts;
        if (!lastContacts.includes(contactID)) {
            if (lastContacts.length < 5) {
                lastContacts.unshift(contactID);
                try {
                    const updatingUser = await User.findByIdAndUpdate({ _id: userID }, { $set: { lastContacts: lastContacts }}, {useFindAndModify: false}, (err, result) => {
                        if (err) {
                            console.log('Failed');
                            console.log(err);
                        } else {
                            console.log('Completed');
                        }
                    });
                } catch (err) {
                    console.log('Attempt failed');
                    console.log(err);
                }
            } else {
                lastContacts.pop();
                lastContacts.unshift(contactID);
                try {
                    const updatingUser = await User.findByIdAndUpdate({ _id: userID }, { $set: { lastContacts: lastContacts }}, {useFindAndModify: false}, (err, result) => {
                        if (err) {
                            console.log('Failed');
                            console.log(err);
                        } else {
                            console.log('Completed');
                        }
                    });
                } catch (err) {
                    console.log('Attempt failed');
                    console.log(err);
                }
            }
        } else {
            const index = lastContacts.indexOf(contactID);
            lastContacts.splice(index, 1);
            lastContacts.unshift(contactID);
            try {
                const updatingUser = await User.findByIdAndUpdate({ _id: userID }, { $set: { lastContacts: lastContacts }}, {useFindAndModify: false}, (err, result) => {
                    if (err) {
                        console.log('Failed');
                        console.log(err);
                    } else {
                        console.log('Completed');
                    }
                });
            } catch (err) {
                console.log('Attempt failed');
                console.log(err);
            }
        }

    } catch (err) {
        console.log(err);
    }
};

const status_of_lastContacts = async (lastContacts) => {
    const contactsWithStatus = [];

    for (let index = 0; index < lastContacts.length; index++) {
        const user = await User.findById(lastContacts[index]).select('onlineStatus').lean();
        contactsWithStatus.push(user);
    }
    return contactsWithStatus;
};


module.exports = {
    change_status,
    update_lastContacts,
    trial_add_lastContacts,
    get_lastContacts,
    status_of_lastContacts
};