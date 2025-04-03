const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "test";

const generateToken = (userId, options = {
    expiresIn: '1h',
}) => {
    return jwt.sign({ id: userId }, SECRET_KEY, options);
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}