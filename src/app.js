require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use("/auth", require('./routers/auth_route')); // Use the auth_route for authentication-related routes


module.exports = app; // Export the app for testing purposes