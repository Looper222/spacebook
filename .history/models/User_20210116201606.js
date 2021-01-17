const mongoose = require('mongoose');
const { isEmail, isStrongPassword, isDate, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');

// creating schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter and email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    surname: {
        type: String,
        required: [true, 'Please enter your surname']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        unique: true,
        validate: [isStrongPassword, 'Please enter strong password']
    },
    phoneNumber: {
        type: String,
        unique: true,
        validate: [isMobilePhone, 'Please enter a valid phone number']
    },
    birthDate: {
        type: String,
        required: [true, 'Please enter your birth date'],
        validate: [isDate, 'Please enter a valid date']
    },
    race: {
        type: String,
        required: [true, 'Please enter your race'],
    },
    sex: {
        type: String,
        required: [true, 'Please choose your sex']
    },
    planet: {
        type: String,
        required: [true, "Please enter your planet's name"]
    }
});

// hashing function
const hashValuesAsync = function() {

};

// hash values before save them to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    
});

// define User model
const User = mongoose.model('user', userSchema);

module.exports = User;