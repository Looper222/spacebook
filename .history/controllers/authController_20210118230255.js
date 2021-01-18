const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handling errrors



// create jwt
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'uG4pUlyy1nRRrDA9', { expiresIn: maxAge });
};


// after submit registration data
const signup_post = async (req, res) => {
    const { email, name, surname, password, phoneNumber, birthDate, race, sex, planet } = req.body;

    try {
        const user = await User.create({ email, name, surname, password, phoneNumber, birthDate, race, sex, planet });
        const token = createToken(user._id);
        res.cookie('authenticatedUser', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        console.log(err);
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
        res.status(400).json(err);
    }
};



module.exports = {
    signup_post,
    login_post
};