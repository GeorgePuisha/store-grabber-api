const express = require("express");
const path = require("path");
const app = express();

const { Pool, Client } = require("pg");
const connectionString = "postgres://user:password@host:port/database";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: true
});

const server = app.listen(process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.send("Response");
});

module.exports.closeServer = () => {
    server.close();
};
