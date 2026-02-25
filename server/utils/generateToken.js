const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT for the given user ID.
 * @param {string} id - User's MongoDB _id
 * @returns {string} Signed JWT
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

module.exports = generateToken;
