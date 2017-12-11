const redis = require("../controllers/redis");
const amqp = require("../controllers/amqp");

module.exports.saveData = (req, res) => {
    if (req.body) {
        redis.hmset(req.body.email, {
            "currency": req.body.currency,
            "rate": req.body.rate
        });
        res.json({});
        amqp.publishNotification({
            status: "info",
            text: "Currency has been changed!"
        });
    }
};