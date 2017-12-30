const client = require("../controllers/elasticsearch.js");
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

const foldHits = (hits) => {
    let folded = [];
    let result = [];

    hits.forEach((hit) => {
        folded[hit._source.key] = hit;
        folded[hit._source.key].count = 0;
    });

    hits.forEach((hit) => {
        folded[hit._source.key].count++;
    });

    for (key in folded) {
        if (folded.hasOwnProperty(key)) {
            result.push(folded[key]);
        }
    };

    return result;
};

const calculateScore = (hits) => {
    const factor = 1;
    const countCoefficient = 0.01;
    const relevanceCoefficient = 0;

    let countFactor = 0;

    hits = foldHits(hits);

    hits.forEach((hit) => {
        countFactor = factor + (hit.count * countCoefficient);
        hit._score = hit._score * countFactor;
    });

    return hits;
};

const handleHits = (hits) => {
    result = calculateScore(hits);

    result.forEach(hit => {
        console.log(hit._source.name);
        //console.log(hit._source.email);
        console.log(hit._score)
    });

    return result;
};

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
                fuzziness: 2
            }
        }
    }
}).then((resp) => {
    resp.hits.hits.forEach(hit => {
        console.log(hit._source.name);
        //console.log(hit._source.email);
        console.log(hit._score)
        //console.log(hit);
    });
    response.json(handleHits(resp.hits.hits));
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