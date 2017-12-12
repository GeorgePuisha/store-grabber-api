const app = require("express")();
const server = require("http").Server(app);
const socket = require("socket.io")(server);

server.listen(3001);

module.exports = socket;