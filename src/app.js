require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./database');
const authRoutes = require('./routers/auth_route'); // Import the auth_route

const app = express();

const sessionStore = process.env.NODE_ENV === 'test' ?
    new (require('express-session').MemoryStore)() :
    new PrismaSessionStore(
        prisma, {
        checkPeriod: 2 * 60 * 1000, // Verify session every 2 minutes
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    });
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Verify session every 7 days
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        },
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })
)
//Middlewares
app.use(express.json());

//Routes
app.use("/auth", authRoutes);

module.exports = app;