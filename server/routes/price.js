const models = require("../models/index");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const checkForAllWatched = () => {
    models.Watched.findAll()
        .then((watchedList) => {
            watchedList.forEach((watched) => {
                checkPriceByKey(watched.key);
            });
        });
};

const checkPriceByKey = (key) => {
    needle.get(url + key, (err, res) => {
        addPrice(key, res.body.prices.price_min.amount)
    });
};

const addPrice = (key, price) => {
    models.Watched.find({
        where: {
            key: key
        }
    }).then((watched) => {
        watched.price.push(price);
        watched.update({
            price: watched.price
        }, {
            where: {
                key: key
            }
        });
    });
};

module.exports.checkForAllWatched = checkForAllWatched;