const queue = "letters";
const url = process.env.CLOUDAMQP_URL;
const open = require("amqplib").connect(url);

const getFromQueue = (callback) => {
    open.then((connection) => {
        let createdChannel = connection.createChannel();
        createdChannel = createdChannel.then((channel) => {
            channel.assertQueue(queue);
            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    callback(JSON.parse(msg.content));
                    channel.ack(msg);
                }
            })
        });
        return createdChannel;
    });
};

const sendToQueue = (information) => {
    open.then((connection) => {
        let createdChannel = connection.createChannel();
        createdChannel = createdChannel.then((channel) => {
            channel.assertQueue(queue);
            channel.sendToQueue(queue, new Buffer(JSON.stringify(information)));
        });
        return createdChannel;
    });
};

module.exports.getFromQueue = getFromQueue;

module.exports.sendToQueue = sendToQueue;