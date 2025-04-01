const route = require('express').Router();
const prisma = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidator = require('../validators/user_validator');

route.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        var errors = [];
        if (!userValidator.validateName(name)) {
            errors.push('Invalid name format');
        }
        if (!userValidator.validateEmail(email)) {
            errors.push('Invalid email format');
        }
        if (!userValidator.validatePassword(password)) {
            errors.push('Invalid password format');
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // TODO: hash password in the client and add nonce to the server
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(201).json({ token });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'User already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' }); //Falta um teste
    }
});
route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' }); // Falta um teste
    }
});

module.exports = route;