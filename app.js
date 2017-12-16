const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./server/routes/index");
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://store-grabber.herokuapp.com");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use("/api", routes);

app.use(cors({
    credentials: true,
    origin: "*"
}));

module.exports.app = app;

module.exports.server = app.listen(process.env.PORT || 3000);

module.exports.closeServer = () => {
    server.close();
};