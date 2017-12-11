const app = require("../../app");
const socket = require("socket.io");

module.exports = socket(app.server);