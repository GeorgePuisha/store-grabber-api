const models = require("../models/index");

const express = require("express");
const router = express.Router();

router.get("/login/:email/:nickname", () => {
    console.log("Got it!");
});

module.exports = router;
