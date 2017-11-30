const models = require("../models/index");
const needle = require("needle");
const mailer = require("../controllers/nodemailer");

const url = "https://catalog.api.onliner.by/products/";

const findUserById = (id) => models.User.find({
    where: {
        id
    }
});

const isPriceChanged = (oldPrice, newPrice) => {
    return newPrice.toString() !== oldPrice.toString();
}

const addToPrices = (watched, price) => {
    const oldPrice = watched.price.slice(-1)[0];
    watched.price.push(price);
    watched.update({
        price: watched.price
    }, {
        where: {
            key: watched.key
        }
    }).then(() => {
        if (isPriceChanged) {
            findUserById(watched.userId).then((user) => mailer.sendEmail(watched, oldPrice, price, user.email));
        }
    });
};

const savePrice = (key, price) => {
    models.Watched.find({
        where: {
            key
        }
    }).then((watched) => addToPrices(watched, price));
};

const getPriceByKey = (key) => {
    needle.get(url + key, (err, res) => savePrice(key, res.body.prices.price_min.amount));
};

const checkAllWatched = () => {
    models.Watched.findAll()
        .then((watchedList) => {
            watchedList.forEach((watched) => getPriceByKey(watched.key));
        });
};

module.exports.checkAllWatched = checkAllWatched;