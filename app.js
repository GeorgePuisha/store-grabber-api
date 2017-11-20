const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const routes = require("./server/routes/index");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Content-Type", "application/json");
    next();
});
app.use(cors());

app.use("/api", routes)

const server = app.listen(process.env.PORT || 3000);

app.use(routes);

module.exports.closeServer = () => {
    server.close();
};
