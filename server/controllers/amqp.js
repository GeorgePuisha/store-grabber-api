const queue = "letters";
const url = process.env.CLOUDAMQP_URL;
const open = require("amqplib").connect(url);

const createChannel = (mode, callback) => {
    open.then((connection) => {
        let createdChannel = connection.createChannel();
        createdChannel = createdChannel.then((channel) => mode(channel, callback));
    });
};

const read = (channel, callback) => {
    channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            callback(JSON.parse(msg.content));
            channel.ack(msg);
        }
    });
};

const write = (channel, information) => {
    channel.assertQueue(queue);
    channel.sendToQueue(queue, new Buffer(JSON.stringify(information)));
};

module.exports.getFromQueue = (callback) => createChannel(read, callback);

module.exports.sendToQueue = (information) => createChannel(write, information);