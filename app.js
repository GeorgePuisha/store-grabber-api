const express = require("express");
const path = require("path");
const app = express();

const routes = require("./routes/index");

app.use("/api", routes)

const server = app.listen(process.env.PORT || 3000);

app.use(routes);

module.exports.closeServer = () => {
    server.close();
};
