const authToken = require('../utils/authToken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = authToken.verify(token);
        req.session.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}