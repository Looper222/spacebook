const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: [true, 'None of members are included']
    },
    room: [
        {
            authorID: String,
            message: String,
            readStatus: Boolean,
            sentDate: String,
            readDate: String
        }
    ]
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;