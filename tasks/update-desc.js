const description = require("../server/services/description");
const elasticsearch = require("../server/elasticsearch/index");

//description.updateAllDescriptions();

elasticsearch.updateDocumentPrice({
    key: "iphonex"
}, "2600.00");