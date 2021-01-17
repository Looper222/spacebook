const bcrypt = require('bcrypt');

const valueToCompare = async (value, salt) => {
    const data = await bcrypt.hash(value, salt);
}