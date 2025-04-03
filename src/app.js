require('dotenv').config();

const express = require('express');
const sessionConfig = require('./config/sessionConfig');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routers/authRoute');
const viewsRoutes = require('./routers/viewsRoute');
const limiter = require('./config/rateLimit');
const helmet = require('helmet');

const app = express();

app.use(limiter);
app.use(helmet());
app.use(errorHandler);
app.use(express.json());
app.use(sessionConfig);
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/views", viewsRoutes);

module.exports = app;