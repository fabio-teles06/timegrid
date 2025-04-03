const validateName = (name) => {
    return typeof name === 'string' && /^[a-zA-Z\s]+$/.test(name);
};

const validateEmail = (email) => {
    return typeof email === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const validatePassword = (password) => {
    // Password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
    return typeof password === 'string' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password);
};

const validate = (userData) => {
    const { name, email, password } = userData;
    const errors = [];

    if (!validateName(name)) {
        errors.push({
            field: 'name',
            message: 'Name must be a string containing only letters and spaces.'
        });
    }

    if (!validateEmail(email)) {
        errors.push({
            field: 'email',
            message: 'Email must be a valid email address.'
        });
    }

    if (!validatePassword(password)) {
        errors.push({
            field: 'password',
            message: 'Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        });
    }

    return { isValid: errors.length === 0, errors };
}

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validate
};