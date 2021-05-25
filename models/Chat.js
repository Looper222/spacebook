const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    // roomID: {
    //     type: String,
    //     required: [true, 'Set roomID property']
    // },
    members: {
        type: Array,
        minlength: 2,
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