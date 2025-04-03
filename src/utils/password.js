const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}