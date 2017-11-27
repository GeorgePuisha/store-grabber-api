const models = require("../models/index");
const onliner = require("./onliner");
const watch = require("./watch");
const express = require("express");
const router = new express.Router();

router.post("/login", (req, res) => {
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
        res.status(200).json(user);
    });
});

router.get("/search/:query/last", onliner.lastPage);

router.get("/search/:query/:page", onliner.search);

router.get("/watch/:email/:key", watch.addToList);

module.exports = router;
