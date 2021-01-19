const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handling errrors
const handleErrors = (err) => {
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
        errors.password = 'The entered password is not correct';
    }

    // duplicate value error --> TO-DO!

    

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
        race: '',
        sex: '',
        planet: ''
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
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'uG4pUlyy1nRRrDA9', { expiresIn: maxAge });
};


// after submit registration data
const signup_post = async (req, res) => {
    const { email, fname, surname, password, phoneNumber, birthDate, race, sex, planet } = req.body;

    try {
        const user = await User.create({ email, fname, surname, password, phoneNumber, birthDate, race, sex, planet });
        const token = createToken(user._id);
        res.cookie('authenticatedUser', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrorsSignup(err);
        // console.log(err);
        res.status(400).json({ errors });
    }
};

// after submit login data
const login_post = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.login( login, password);
        const token = createToken(user._id);
        res.cookie('authenticatedUser', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).json({ user: user._id });
        console.log('user logged');
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};



module.exports = {
    signup_post,
    login_post
};