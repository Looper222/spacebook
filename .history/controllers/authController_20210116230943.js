// signup_post
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup_post = async (req, res) => {
    const { email, name, surname, password, phoneNumber, birthDate, race, sex, planet } = req.body;

    try {
        const user = await User.create({ email, name, surname, password, phoneNumber, birthDate, race, sex, planet });
        const token = createToken(user._id);
    }
    catch(err) {
        console.log(err);
    }
}
