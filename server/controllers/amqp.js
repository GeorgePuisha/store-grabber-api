const queue = "letters";
const url = process.env.CLOUDAMQP_URL;
const open = require("amqplib").connect(url);

const read = (channel, callback) => {
    channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            callback(JSON.parse(msg.content));
            channel.ack(msg);
        }
    });
};

const getFromQueue = (callback) => {
    open.then((connection) => {
        let createdChannel = connection.createChannel();
        createdChannel = createdChannel.then((channel) => read(channel, callback));
    });
};

const write = (channel, information) => {
    channel.assertQueue(queue);
    channel.sendToQueue(queue, new Buffer(JSON.stringify(information)));
};

const sendToQueue = (information) => {
    open.then((connection) => {
        let createdChannel = connection.createChannel();
        createdChannel = createdChannel.then((channel) => write(channel, information));
    });
};

module.exports.getFromQueue = getFromQueue;

module.exports.sendToQueue = sendToQueue;