const letterQueue = "letters";
const notificationsQueue = "notifications";
const ex = "notifications";
const url = process.env.CLOUDAMQP_URL;
const open = require("amqplib").connect(url);

const createChannel = (queue, mode, callback) => {
    open.then((connection) => {
        let createdChannel = connection.createChannel();
        createdChannel = createdChannel.then((channel) => mode(queue, channel, callback));
    });
};

const read = (queue, channel, callback) => {
    channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            callback(JSON.parse(msg.content));
            channel.ack(msg);
        }
    });
};

const write = (queue, channel, information) => {
    channel.assertQueue(queue);
    channel.sendToQueue(queue, new Buffer(JSON.stringify(information)));
};

const subscribe = (queue, channel, callback) => {
    channel.assertExchange(ex, "fanout", {
        durable: false
    });
    channel.assertQueue(queue);
    channel.bindQueue(queue, ex, "");
    channel.consume(queue, (msg) => {
        callback(msg.content.toString());
    }, {
        noAck: true
    });
};

const publish = (queue, channel, information) => {
    channel.assertExchange(ex, "fanout", {
        durable: false
    });
    channel.publish(ex, queue, new Buffer(JSON.stringify(information)));
};

module.exports.getFromLetterQueue = (callback) => createChannel(letterQueue, read, callback);

module.exports.sendToLetterQueue = (information) => createChannel(letterQueue, write, information);

module.exports.publishNotification = (information) => createChannel(notificationsQueue, publish, information);

module.exports.subscribeToNotifications = (callback) => createChannel(notificationsQueue, subscribe, callback);