module.exports = {
    // Complete name validation
    validateName: (name) => {
        if (typeof name !== 'string') {
            return false;
        }
        const regex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
        return regex.test(name);
    },
    validateEmail: (email) => {
        if (typeof email !== 'string') {
            return false;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    //password 12 characters long, at least one uppercase letter, one lowercase letter, one number and one special character
    validatePassword: (password) => {
        if (typeof password !== 'string') {
            return false;
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    },
}