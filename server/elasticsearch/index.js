const client = require("../controllers/elasticsearch.js");

const index = "products";
const type = "watched";

const createIndex = () => client.indices.create({
    index
});

const deleteIndex = () => client.indices.delete({
    index
});

const addDocument = (body) => client.index({
    index,
    type,
    body,
    id: body.key
});

const getDocuments = (query, response) => client.search({
    index,
    type,
    body: {
        query: {
            match: {
                description: query
            }
        }
    }
}).then((resp) => {
    response.json(resp.hits.hits);
});

const getAllDocuments = () => client.search({
    index,
    type,
    body: {
        query: {
            "match_all": {}
        }
    }
}).then((resp) => {
    console.log(resp.hits.hits);
});

const deleteDocument = (key) => client.delete({
    index,
    type,
    id: key
});

module.exports.createIndex = createIndex;

module.exports.deleteIndex = deleteIndex;

module.exports.addDocument = addDocument;

module.exports.getDocuments = getDocuments;

module.exports.getAllDocuments = getAllDocuments;

module.exports.deleteDocument = deleteDocument;