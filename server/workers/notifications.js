const amqp = require("../controllers/amqp");
const solveCors = require("../../app").solveCors;
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => solveCors(req, res, next));

app.use(cors());

server.listen(process.env.PORT || 3001);

const sendNotification = (text) => {
    io.emit("message", text);
};

amqp.subscribeToNotifications(sendNotification);