const jwt = require('jsonwebtoken');

/**
 * Decoding user's id from jwt token included in cookie
 * @param {Request} req HTTP request
 * @returns user's ID
 */
const idFromCookie = (req) => {
    const cookie = req.cookies['authenticatedUser'];
    const decodedCookie = jwt.decode(cookie);
    return userID = decodedCookie.id;
};

/**
 * Middleware with components functions
 * @module middleware/componentsMiddleware
 */
module.exports = {
    idFromCookie
}