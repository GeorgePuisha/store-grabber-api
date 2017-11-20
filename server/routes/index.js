const models = require("../models/index");
const express = require("express");
const router = express.Router();

router.post("/login/", (req, res) => {
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
        const created = result[1];
        if (created) {
            res.status(409);
        }
        res.json(user);
    });
});

router.get('/all/', function(req, res) {
    models.User.findAll({}).then(function(users) {
        res.json(users);
    });
});


module.exports = router;
