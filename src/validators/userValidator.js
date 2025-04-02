const validateName = (name) => {
    return typeof name === 'string' && /^[a-zA-Z\s]+$/.test(name);
};

const validateEmail = (email) => {
    return typeof email === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const validatePassword = (password) => {
    return typeof password === 'string' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password);
};

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
};