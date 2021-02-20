const User = require('../models/User');

const new_search_user = async (req, res) => {
    const { phrase } = req.body;

    try {
        const user = await User.find({ phrase }, { projection: { _id: 1, fname: 1, surname: 1 }, hint: { fname: 1, surname: 1 }});



    } catch (err) {
        console.log(err);
    }

};

module.exports = {
    new_search_user
};