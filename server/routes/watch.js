const models = require("../models/index");
const onliner = require("./onliner");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const findOrCreateWatched = (user, product, resp) => {
    models.Watched.findOrCreate({
        where: {
            key: product.key
        },
        defaults: {
            key: product.key,
            name: product.name,
            description: product.description,
            image: product.image,
            price: [product.price],
            url: product.url,
            status: product.status,
            userId: user.id
        }
    }).then(() => {
        resp.status(200);
    });
};

module.exports.addToWatched = (req, resp) => {
    needle.get(url + req.params.key, (err, res, body) => {
        const product = onliner.reduceInformation(res.body);
        models.User.find({
            where: {
                email: req.params.email
            }
        }).then((user) => findOrCreateWatched(user, product, resp));
    });
};

const watchedByUserId = (user, resp) => {
    models.Watched.findAll({
        where: {
            userId: user.id
        }
    }).then((watchedList) => {
        resp.status(200).json(watchedList);
    })
};

module.exports.getAllWatched = (req, resp) => {
    models.User.find({
        where: {
            email: req.params.email
        }
    }).then((user) => watchedByUserId(user, resp));
}