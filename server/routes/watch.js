const models = require("../models/index");
const onliner = require("./onliner");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const addToWatched = (req, resp) => {
    needle.get(url + req.params.key, (err, res, body) => {
        const product = onliner.reduceInformation(res.body);
        models.User.find({
            where: {
                email: req.params.email
            }
        }).then((user) => {
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
            }).then((result) => {
                resp.status(200).json(product);
            });
        });
    });
};

module.exports.addToWatched = addToWatched;
