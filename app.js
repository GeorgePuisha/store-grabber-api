const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./server/routes/index");
const notifications = require("./server/workers/notifications");
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
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
    origin: "http://localhost:4200"
}));

notifications.subscribeToNotifications(notifications.send);

module.exports.server = app.listen(process.env.PORT || 3000);

module.exports.closeServer = () => {
    server.close();
};