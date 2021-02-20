const User = require('../models/User');

const new_search_user = async (req, res) => {
    const { phrase } = req.body;

    try {
        const user = await User.find( { fname: phrase }).projection({ fname: 1 });
        //, { projection: { _id: 0 }}
        // , hint: { fname: 1, surname: 1 }

        console.log(user);
        res.status(201).json({ user });

    } catch (err) {
        console.log(err);
    }

};

module.exports = {
    new_search_user
};