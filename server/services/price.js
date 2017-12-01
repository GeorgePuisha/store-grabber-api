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
        if (res.body.prices) {
            savePrice(key, res.body.prices.price_min.amount);
        } else {
            console.log(res.body);
        }
    });
    console.log()
};

const checkAllWatched = () => {
    models.Watched.findAll()
        .then((watchedList) => watchedList.forEach((watched, index) => setTimeout(() => getPriceByKey(watched.key), 1000 * index)));
};

module.exports.checkAllWatched = checkAllWatched;