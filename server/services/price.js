const mailer = require("../controllers/nodemailer");
const models = require("../models/index");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const findUserById = (id) => models.User.find({
    where: {
        id
    }
});

const isPriceChanged = (oldPrice, newPrice) => {
    return newPrice.toString() !== oldPrice.toString();
};

const addToPrices = (watched, price) => {
    const oldPrice = watched.price.slice(-1)[0];
    watched.price.push(price);
    watched.update({
        price: watched.price
    }, {
        where: {
            key: watched.key,
            userId: watched.userId
        }
    }).then(() => {
        if (isPriceChanged(oldPrice, price)) {
            findUserById(watched.userId).then((user) => mailer.sendEmail(watched, oldPrice, price, user.email));
        }
    });
};

const savePrice = (key, price) => {
    models.Watched.findAll({
        where: {
            key
        }
    }).then((watchedList) => watchedList.forEach((watched) => addToPrices(watched, price)));
};

const getPriceByKey = (key) => {
    needle.get(url + key, (err, res) => {
        savePrice(key, res.body.prices.price_min.amount);
    });
};

const checkAllWatched = () => {
    models.Watched.findAll()
        .then((watchedList) => watchedList.forEach((watched, index) => setTimeout(() => getPriceByKey(watched.key), 1000 * index)));
};

module.exports.checkAllWatched = checkAllWatched;