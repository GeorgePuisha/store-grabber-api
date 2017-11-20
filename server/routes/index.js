const models = require("../models/index");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    models.User.create({
        email: req.body.email,
        nickname: req.body.nickname
    }).then((user) => {
        res.json(user);
    });
});

module.exports = router;
