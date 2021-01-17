const mongoose = require('mongoose');
const { isEmail, isStrongPassword, isDate, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');
const { valueToCompare } = require('../middleware/authMiddleware');

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

// hash values before save them to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.name = await bcrypt.hash(this.name, salt);
    this.surname = await bcrypt.hash(this.surname, salt);
    this.password = await bcrypt.hash(this.password, salt);
    this.birthDate = await bcrypt.hash(this.birthDate, salt);
    next();
});

// static login user method --> TO DO !!
userSchema.statics.login = async function(login, password) {
    // validate login data
    let loginCheck = isEmail(login);
    if (loginCheck == true) {
        const user = await this.findOne({ email: login });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    } else {
        loginCheck = isMobilePhone(login);
        if (loginCheck == true) {
            const user = await this.findOne({ phoneNumber: login });
            if (user) {
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    return user;
                }
            }
        }
    }
}

// define User model
const User = mongoose.model('user', userSchema);

module.exports = User;