const authService = require('../services/authService');
const userValidator = require('../validators/userValidator');
const transport = require('../config/mailer');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const errors = [];

        if (!userValidator.validateName(name)) errors.push('Invalid name format');
        if (!userValidator.validateEmail(email)) errors.push('Invalid email format');
        if (!userValidator.validatePassword(password)) errors.push('Invalid password format');

        if (errors.length > 0) return res.status(400).json({ errors });

        const user = await authService.registerUser(name, email, password);
        const token = authService.generateToken(user.id);
        const verifyUrl = `${process.env.APP_URL}/verify/${token}`;

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: 'Email Verification',
            text: `Click the link to verify your email: ${verifyUrl}`,
        };
        await transport.sendMail(mailOptions);
        return res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        if (error.code === 'P2002') return res.status(409).json({ error: 'User already exists' });
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        if (!user.verified) return res.status(403).json({ error: 'Email not verified' });

        const token = authService.generateToken(user.id);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function verify(req, res) {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await authService.verifyUser(decoded.id);

        if (!user) return res.status(401).json({ error: 'Invalid token' });

        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}


module.exports = { register, login, verify };