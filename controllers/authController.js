const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handling errrors
const handleErrorsLogin = (err) => {
    console.log(err.message, err.code);
    let errors = { login: '', password: ''};

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.login = 'That email is not registered';
    }

    // incorrect number
    if (err.message === 'incorrect number') {
        errors.login = 'That number is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Entered password is not correct';
    }

    return errors;
};

const handleErrorsSignup = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        fname: '',
        surname: '',
        password: '',
        phoneNumber: '',
        birthDate: '',
        // race: '',
        sex: ''
        // planet: ''
    }

    // duplicate value errors
    if (err.code === 11000) {
        if (err.message.includes('email_1 dup')) {
            errors.email = 'That email is already registered';
            return errors;
        }
        if (err.message.includes('phoneNumber_1 dup')) {
            errors.phoneNumber = 'That number is already registered';
            return errors;
        }
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// create jwt
/**
 * Age of cookie's life
 * @type {Int32}
 */
const maxAge = 1 * 24 * 60 * 60;

/**
 * Creating token JWT
 * @function
 * @param {String} id user's id
 * @returns jwt token with payload: { id }, and expiresIn: { maxAge }
 */
const createToken = (id) => {
    return jwt.sign({ id }, 'uG4pUlyy1nRRrDA9', { expiresIn: maxAge });
};

// after submit registration data
/**
 * Registration process
 * @description
 * Save new user's info to DB
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const signup_post = async (req, res) => {
    const { email, fname, surname, password, phoneNumber, birthDate, sex } = req.body;
    const onlineStatus = false;
    const friends = [];
    const notifs = [];
    const chat = [];
    const lastContacts = [];

    try {
        let user;
        if ( phoneNumber == "" || phoneNumber == null) {
            user = await User.create({ email, fname, surname, password, birthDate, sex, onlineStatus, friends, notifs, chat, lastContacts });
        } else {
            user = await User.create({ email, fname, surname, password, birthDate, sex, onlineStatus, friends, notifs, chat, lastContacts, phoneNumber });
        }
        const token = createToken(user._id);
        res.cookie('authenticatedUser', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrorsSignup(err);
        res.status(400).json({ errors });
    }
};

// after submit login data
/**
 * Authorization process - login
 * @description
 * Authorize user by comparing data sent with data from DB
 * @function
 * @param {Request} req HTTP request methods/POST
 * @param {Response} res HTTP response
 */
const login_post = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.login( login, password);
        const token = createToken(user._id);
        res.cookie('authenticatedUser', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).json({ id: user._id, email: user.email, fname: user.fname, surname: user.surname, token: token });
    }
    catch(err) {
        const errors = handleErrorsLogin(err);
        res.status(400).json({ errors });
    }
};

/**
 * Controller including functions with user's authorization process
 * @module controllers/authController
 */
module.exports = {
    signup_post,
    login_post
};