const express = require("express");
const user = require("./user");
const onliner = require("./onliner");
const watch = require("./watch");
const currency = require("./currency");

const router = new express.Router();

router.post("/login", user.login);

router.get("/search/:query/last", onliner.lastPage);

router.get("/search/:query/:page", onliner.search);

router.get("/watch/:email/:key", watch.addToWatched);

router.get("/unwatch/:email/:key", watch.deleteFromWatched);

router.get("/watched/all/:email", watch.getAllWatched);

router.get("/watched/:key/:email", watch.getWatchedByKey);

router.put("/currency", currency.saveData);

module.exports = router;