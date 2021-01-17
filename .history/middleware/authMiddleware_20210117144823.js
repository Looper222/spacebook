const bcrypt = require('bcrypt');

const valueToCompare = async (value) => {
    const salt = await bcrypt.genSalt();
    const data = await bcrypt.hash(value, salt);
    return data;
};

module.exports = {
    valueToCompare
}