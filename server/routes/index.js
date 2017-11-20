const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/login/:email/:nickname", () => {
    console.log("Got it!");
});

module.exports = router;
