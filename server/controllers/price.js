const models = require("../models/index");
const needle = require("needle");
const mailer = require("./nodemailer");

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
    const oldPrice = watched.price.slice(-1)[0];
    watched.price.push(price);
    watched.update({
        price: watched.price
    }, {
        where: {
            key: watched.key
        }
    }).then(() => comparePrices(watched, oldPrice, price));
};

const comparePrices = (watched, oldPrice, newPrice) => {
    if (newPrice.toString() !== oldPrice.toString()) {
        findUserById(watched.userId).then((user) => mailer.sendEmail(watched, oldPrice, newPrice, user.email));
    }
};

const findUserById = (id) => models.User.find({
    where: {
        id: id
    }
});

module.exports.checkForAllWatched = checkForAllWatched;