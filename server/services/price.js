const redis = require("../controllers/redis");
const amqp = require("../controllers/amqp");
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

const updateWatchedPrice = (watched, price) => {
    const oldPrice = watched.price;
    models.Watched.update({
        price
    }, {
        where: {
            id: watched.id
        }
    }).then(() => findUserById(watched.userId).then((user) => amqp.sendToLetterQueue({
        product: watched,
        oldPrice,
        newPrice: price,
        user
    })));
};

const checkWatchedPrice = (watched, price) => {
    redis.rpush([watched.id, price]);
    if (isPriceChanged(watched.price, price)) {
        updateWatchedPrice(watched, price);
    }
};

const getWatchedPrice = (watched) => {
    needle.get(url + watched.key, (err, res) => {
        if (res.body.prices) {
            checkWatchedPrice(watched, res.body.prices.price_min.amount);
        }
    });
};

const checkAllWatched = () => {
    const timeout = 500;
    models.Watched.findAll()
        .then((watchedList) => watchedList.forEach((watched, index) => setTimeout(() => getWatchedPrice(watched), timeout * index)));
};

module.exports.checkAllWatched = checkAllWatched;