const redis = require("../controllers/redis");

module.exports.saveData = (req, res) => {
    if (req.body) {
        redis.hmset(req.body.email, {
            "currency": req.body.currency,
            "rate": req.body.rate
        });
        res.json({});
    }
}