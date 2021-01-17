const mongoose = require('mongoose');
const validator = require('validator');


// creating schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter and email'],
        unique: true,
        lowercase: true,

    },
    login: {

    },
    password: {

    },
    birthDate: {

    },
    sex: {

    }
})