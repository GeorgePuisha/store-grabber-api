const client = require("../controllers/elasticsearch.js");

const index = "products";
const type = "watched";

const createIndex = () => client.indices.create({
    index
});

const deleteIndex = () => client.indices.delete({
    index
});

const addDocument = (body, callback) => client.index({
    index,
    type,
    body
}, () => callback());

module.exports.createIndex = createIndex;

module.exports.deleteIndex = deleteIndex;

module.exports.addDocument = addDocument;