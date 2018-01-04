const elasticsearch = require("../elasticsearch/index");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const updateDescription = (hit) => {
    needle.get(url + hit._source.key, (err, res) => {
        if (res.body.description) {
            elasticsearch.updateDocumentDescription(hit._id, res.body.description);
        }
    });
};

const updateAllDescriptions = () => {
    const timeout = 500;
    elasticsearch.getAllDocuments()
        .then((resp) => resp.hits.hits.forEach((hit, index) => setTimeout(() => updateDescription(hit), timeout * index)));
};

module.exports.updateAllDescriptions = updateAllDescriptions;