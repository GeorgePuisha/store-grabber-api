const models = require("../models/index");
const onliner = require("./onliner");
const watch = require("./watch");
const currency = require("./currency");
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
        res.json(user);
    });
});

router.get("/search/:query/last", onliner.lastPage);

router.get("/search/:query/:page", onliner.search);

router.get("/recommended/:query", onliner.recommended);

router.get("/watch/:email/:key", watch.addToWatched);

router.get("/unwatch/:email/:key", watch.deleteFromWatched);

router.get("/watched/all/:email", watch.getAllWatched);

router.get("/watched/:key/:email", watch.getWatchedByKey);

router.put("/currency", currency.saveData);

module.exports = router;