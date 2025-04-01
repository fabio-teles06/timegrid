require('dotenv').config();

const express = require('express');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./db');

const app = express();
const sessionStore = process.env.NODE_ENV === 'test' ?
    new (require('express-session').MemoryStore)() :
    new PrismaSessionStore(
        prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    });

app.use(express.json());
app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 //ms
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: sessionStore
    })
)
app.use("/auth", require('./routers/auth_route')); // Use the auth_route for authentication-related routes


module.exports = app; // Export the app for testing purposes