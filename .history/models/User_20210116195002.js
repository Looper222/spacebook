const mongoose = require('mongoose');
const { isEmail, isStrongPassword } = require('validator');

// creating schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter and email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    login: {
        type: String,
        required: [true, 'Please enter a login'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        unique: true,
        validate: [isStrongPassword, 'Please enter strong password']
    },
    birthDate: {

    },
    race: {

    },
    sex: {

    },
    planet: {

    }
})