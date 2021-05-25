const User = require('../models/User');
const Chat = require('../models/Chat');
// const { idFromCookie } = require('../middleware/componentsMiddleware');

const single_chat_create = async (cookieID, friendID, message) => {
    const userID = cookieID;
    const sentDate = new Date().toUTCString();
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

        const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { allChats: { chatID: chatID, friendID: friendID }}}, {useFindAndModify: false}, function(err, result) {
            if (err) {
                console.log(chatID);
                console.log('Failed adding to allChats');
                console.log(err);
            } else {
                console.log(chatID);
                console.log('Completed adding to allChats');
            }
        });

        const friend = await User.findOneAndUpdate({ _id: friendID }, { $addToSet: { allChats: { chatID: chatID, friendID: userID }}}, {useFindAndModify: false}, function(err, result) {
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
        console.log('single chat error');
        console.log(err);
    }
};

const auto_choose_opt = async (cookieID, friendID, message) => {
    try {
        const chatInfo = await User.find({ _id: cookieID, allChats: { $in: friendID }}).selected(`allChats`);

        if (!chatInfo) {
            console.log('nie istnieje w bazie danych jeszcze');
            const single_chat_entity = await single_chat_create(cookieID, friendID, message);
            return single_chat_entity;
        } else {
            console.log('istnieje');
            console.log(chatInfo);
            return chatInfo;
        }
    } catch (err) {
        console.log ('auto choose error');
        console.log(err);
    }
};

module.exports = {
    single_chat_create,
    auto_choose_opt
};