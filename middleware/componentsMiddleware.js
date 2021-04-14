const jwt = require('jsonwebtoken');

// const cookie = req.cookies['authenticatedUser'];
// const decodedCookie = jwt.decode(cookie);
// const userID = decodedCookie.id;

const idFromCookie = (req) => {
    const cookie = req.cookies['authenticatedUser'];
    const decodedCookie = jwt.decode(cookie);
    return userID = decodedCookie.id;
};


module.exports = {
    idFromCookie
}