require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');

app.get('/', (req, res) => {

    db.default.$connect();
    db.default.event.findMany().then((events) => {
        res.send(events);
    }).catch((error) => {
        console.log(error);
        res.send('Error');
    }).finally(() => {
        db.default.$disconnect();
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});