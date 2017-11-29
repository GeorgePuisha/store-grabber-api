const models = require("../models/index");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const checkForAllWatched = () => {
    models.Watched.findAll()
        .then((watchedList) => {
            watchedList.forEach((watched) => {
                getPriceByKey(watched.key);
            });
        });
};

const getPriceByKey = (key) => {
    needle.get(url + key, (err, res) => {
        savePrice(key, res.body.prices.price_min.amount);
    });
};

const savePrice = (key, price) => {
    models.Watched.find({
        where: {
            key: key
        }
    }).then((watched) => {
        addToPrices(watched, price);
    });
};

const addToPrices = (watched, price) => {
    watched.price.push(price);
    watched.update({
        price: watched.price
    }, {
        where: {
            key: key
        }
    }).then(() => comparePrices(watched.price, price));
};

const comparePrices = (oldPrice, newPrice, userId) => {
    if (newPrice !== oldPrice) {
        findUserById(userId).then((user) => sendEmail(oldPrice, newPrice, user.email));
    }
};

const findUserById = (id) => models.User.find({
    where: {
        id: id
    }
});

const sendEmail = (oldPrice, newPrice, email) => {
    //TODO: send e-mail
};

module.exports.checkForAllWatched = checkForAllWatched;