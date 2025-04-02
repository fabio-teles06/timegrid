const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./database');

const sessionStore = process.env.NODE_ENV === 'test' ?
    new (require('express-session').MemoryStore)() :
    new PrismaSessionStore(
        prisma, {
        checkPeriod: 2 * 60 * 1000, // Verify session every 2 minutes
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    });

module.exports = sessionStore;