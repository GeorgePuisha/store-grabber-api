const models = require("../models/index");
const amqp = require("../controllers/amqp");

module.exports.login = (req, res) => {
    models.User.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            email: req.body.email,
            nickname: req.body.nickname
        }
    }).then((result) => {
        const user = result[0];
        res.json(user);
        amqp.publishNotification("Successfully signed in!")
    });
};