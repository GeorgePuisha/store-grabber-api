const amqp = require("../controllers/amqp");
const io = require("../controllers/websocket");

module.exports.send = (text) => {
    io.emit(text);
};

module.exports.subscribeToNotifications = amqp.subscribeToNotifications;