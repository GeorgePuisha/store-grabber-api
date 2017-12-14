const amqp = require("../controllers/amqp");
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());

server.listen(process.env.PORT || 3001);

sendNotification = (text) => {
    console.log(text);
    io.emit("message", text);
};

amqp.subscribeToNotifications(sendNotification);