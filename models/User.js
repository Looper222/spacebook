const mongoose = require('mongoose');
const { isEmail, isStrongPassword, isDate, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');
const { valueToCompare } = require('../middleware/authMiddleware');

// creating schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    fname: {
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
        validate: [isStrongPassword, 'Please enter strong password']
    },
    birthDate: {
        type: String,
        validate: [isDate, 'Please enter a valid date']
    },
    sex: {
        type: String,
    },
    onlineStatus: Boolean,
    friends: [
        {
            _id: String,
            fname: String,
            surname: String
            //state -> it will be pointing to invitation & friendship state, like follows:...
            //...pending (when invitation is waiting for accept), active/friend, deleted(...
            //...when deleted from friends) -> it supposed to be relocated to value deletedFriends...
            //...only friendID to show users past friends

            //status -> it will be pointing to friend online status (online, offline...
            //...away from keyboard and others)
        }
    ],
    notifs: [
        {
            _id: String,
            notifType: String,
            creationDate: String
        }
    ],
    // chat: [
    //     {
    //         _id: String,
    //         nickname: String,
    //         lastUpdate: String,
    //         messages: [
    //                 {
    //                     _id: String,
    //                     message: String,
    //                     readStatus: Boolean,
    //                     sentDate: String,
    //                     readDate: String
    //                 }
    //             ]
    //     }
    // ],
    // chats: {
    //     lastChats: Array,
    //     allChats: Array
    // },
    allChats: Array,
    lastChats: Array,
    lastContacts: Array,
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: v => {
                return /[0-9]{9}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
});

// hash values before save them to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static login user method
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
                throw Error('incorrect password');
            }
            throw Error('incorrect number');
        }
    }
};

// define User model
const User = mongoose.model('user', userSchema);

module.exports = User;