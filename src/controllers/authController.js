const authService = require('../services/authService');

async function getAllUsers(req, res) {
    try {
        const users = await authService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
async function register(req, res) {
    try {
        await authService.register(req.body);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function login(req, res) {
    try {
        const token = await authService.login(req.body);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}


module.exports = { getAllUsers, register, login };