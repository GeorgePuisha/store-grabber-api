const amqp = require("../controllers/amqp");

module.exports.send = (text) => {
    console.log(text);
};

module.exports.subscribeToNotifications = amqp.subscribeToNotifications;