const amqp = require("../controllers/amqp");
const io = require("../controllers/websocket");

module.exports.send = (text) => {
    console.log(text);
    io.emit("message", text);
};

module.exports.subscribeToNotifications = amqp.subscribeToNotifications;