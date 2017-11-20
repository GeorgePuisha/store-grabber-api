const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const routes = require("./server/routes/index");
app.use("/api", routes);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Content-Type", "application/json");
    next();
});
app.use(cors());

const server = app.listen(process.env.PORT || 3000);

module.exports.closeServer = () => {
    server.close();
};
