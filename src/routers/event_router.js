const router = require('express').Router();
const db = require('../db');
const validator = require('../validators/event_validator');

//get all events
router.get('/', (req, res) => {
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

//get event by id
router.get('/:id', (req, res) => {
    db.default.$connect();
    db.default.event.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((event) => {
        res.send(event);
    }).catch((error) => {
        console.log(error);
        res.send('Error');
    }).finally(() => {
        db.default.$disconnect();
    });
});

//create event
router.post('/', validator, (req, res) => {
    //validate request
    res.send('Validated');
});

module.exports = router;