const elasticsearch = require("elasticsearch");

const connectionString = process.env.BONSAI_URL;

module.exports = new elasticsearch.Client({
    host: connectionString
});