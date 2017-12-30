const client = require("../controllers/elasticsearch.js");
const scoring = require("./scoring");
const deleteByQuery = require("elasticsearch-deletebyquery");

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
    body
}).then((resp) => {
    console.log(resp);
});

const getDocuments = (query, response) => client.search({
    index,
    type,
    body: {
        query: {
            multi_match: {
                query,
                fields: [
                    "name",
                    "description",
                    "key"
                ],
                fuzziness: "2"
            }
        }
    }
}).then((resp) => {
    response.json(scoring.handleHits(resp.hits.hits));
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

const deleteDocument = (email, key) => client.deleteByQuery({
    index,
    type,
    body: {
        query: {
            bool: {
                must: [{
                        match: {
                            email
                        }
                    },
                    {
                        match: {
                            key
                        }
                    }
                ]
            }
        }
    }
}, function(error, response) {
    console.log(response);
});

module.exports.createIndex = createIndex;

module.exports.deleteIndex = deleteIndex;

module.exports.addDocument = addDocument;

module.exports.getDocuments = getDocuments;

module.exports.getAllDocuments = getAllDocuments;

module.exports.deleteDocument = deleteDocument;