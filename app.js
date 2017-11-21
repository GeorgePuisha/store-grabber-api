const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const routes = require("./server/routes/index");
app.use("/api", routes);

app.use(cors());

const server = app.listen(process.env.PORT || 3000);

module.exports = app;

module.exports.closeServer = () => {
    server.close();
};
