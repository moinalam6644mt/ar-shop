// utils/token.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // Move this to environment variables in production

function createNewToken(userId) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = { createNewToken };
