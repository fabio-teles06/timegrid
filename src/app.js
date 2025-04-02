require('dotenv').config();

const express = require('express');
const sessionConfig = require('./config/sessionConfig');
const authRoutes = require('./routers/authRoute');

const app = express();

app.use(express.json());
app.use(sessionConfig);

app.use("/auth", authRoutes);

module.exports = app;