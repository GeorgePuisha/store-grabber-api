const amqp = require("../controllers/amqp");
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://store-grabber.herokuapp.com");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

server.listen(process.env.PORT || 3001);

const sendNotification = (text) => {
    io.emit("message", text);
};

amqp.subscribeToNotifications(sendNotification);