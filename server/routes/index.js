const models = require("../models/index");
const express = require("express");
const router = new express.Router();

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
        res.json(user);
    });
});

module.exports = router;
