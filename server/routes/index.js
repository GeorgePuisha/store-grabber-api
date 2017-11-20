const models = require("../models/index");
const express = require("express");
const router = express.Router();

router.post("/login/", (req, res) => {
    models.User.create({
        email: req.body.email,
        nickname: req.body.nickname
    }).then((user) => {
        res.json(user);
    });
});

router.get('/all', function(req, res) {
    models.User.findAll({}).then(function(users) {
        res.json(users);
    });
});


module.exports = router;
