const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
})