const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

async function registerUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
    return await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });
}

async function loginUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
}

async function verifyUser(userId) {
    const now = new Date();
    return await prisma.user.update({
        where: { id: userId },
        data: { verified: true },
    });
}

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { registerUser, loginUser, generateToken, verifyUser };