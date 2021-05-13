const User = require('../models/User');
const Chat = require('../models/Chat');
// const { idFromCookie } = require('../middleware/componentsMiddleware');

const single_chat_create = async (cookieID, friendID, message) => {
    const userID = cookieID;
    const sentDate = new Date().toDateString();

    try {
        const chat = await Chat.create({
            members: [ userID, friendID ],
            room: [{
                authorID: userID,
                message: message,
                readStatus: false,
                sentDate: sentDate,
                readDate: ''
            }]});

        const chatID = chat._id.toString();

        const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { allChats: chatID}}, {useFindAndModify: false}, function(err, result) {
            if (err) {
                console.log(chatID);
                console.log('Failed adding to allChats');
                console.log(err);
            } else {
                console.log(chatID);
                console.log('Completed adding to allChats');
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    single_chat_create
};