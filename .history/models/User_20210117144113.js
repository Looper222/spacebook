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

const salt = await bcrypt.genSalt();

// hash values before save them to db
userSchema.pre('save', async function(salt, next) {
    
    this.email = await bcrypt.hash(this.email, salt);
    this.name = await bcrypt.hash(this.name, salt);
    this.surname = await bcrypt.hash(this.surname, salt);
    this.password = await bcrypt.hash(this.password, salt);
    this.phoneNumber = await bcrypt.hash(this.phoneNumber, salt);
    this.birthDate = await bcrypt.hash(this.birthDate, salt);
    next();
});

// static login user method --> TO DO !!
userSchema.statics.login = async function(login, password) {
    // validate login data
    let loginCheck = isEmail(login);
    if (loginCheck == true) {
        const user = await this.findOne(bcrypt.);
        if (user) {
            const auth = await
        }
    } else {
        loginCheck = isMobilePhone(login);
        if (loginCheck == true) {

        }
    }
}

// define User model
const User = mongoose.model('user', userSchema);

module.exports = User;