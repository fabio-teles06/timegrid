
module.exports = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }
    if (!req.body.description) {
        return res.status(400).send({
            message: "Description can not be empty"
        });
    }
    if (!req.body.date) {
        return res.status(400).send({
            message: "Date can not be empty"
        });
    }
    if (!req.location) {
        return res.status(400).send({
            message: "Location can not be empty"
        });
    }
    next();
}