const session = require('express-session');
const sessionStore = require('./sessionStore');

const sessionConfig = session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        secure: process.env.NODE_ENV === 'production', // Cookies seguros apenas em produção
        httpOnly: true,
    },
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
});

module.exports = sessionConfig;
