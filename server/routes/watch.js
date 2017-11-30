const models = require("../models/index");
const onliner = require("./onliner");
const needle = require("needle");

const url = "https://catalog.api.onliner.by/products/";

const findUserByEmail = (email) => models.User.find({
    where: {
        email
    }
});

const findOrCreateWatched = (user, product, resp) => {
    models.Watched.findOrCreate({
        where: {
            key: product.key,
            userId: user.id
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
    needle.get(url + req.params.key, (err, res) => {
        const product = onliner.reduceInformation(res.body);
        findUserByEmail(req.params.email).then((user) => findOrCreateWatched(user, product, resp));
    });
};

const watchedByUserId = (user, resp) => {
    models.Watched.findAll({
        where: {
            userId: user.id
        }
    }).then((watchedList) => {
        watchedList.forEach((watched) => {
            watched.price = watched.price.pop();
        });
        resp.status(200).json(watchedList);
    })
};

module.exports.getAllWatched = (req, resp) => {
    findUserByEmail(req.params.email).then((user) => watchedByUserId(user, resp));
};

module.exports.deleteFromWatched = (req, resp) => {
    models.Watched.destroy({
        where: {
            key: req.params.key
        }
    }).then(() => {
        resp.status(200);
    });
};

const watchedByUserIdAndKey = (user, key, resp) => {
    models.Watched.find({
        where: {
            key,
            userId: user.id
        }
    }).then((watched) => {
        console.log(key);
        resp.status(200).json(watched);
    });
}

module.exports.getWatchedByKey = (req, resp) => {
    findUserByEmail(req.params.email).then((user) => watchedByUserIdAndKey(user, req.params.key, resp));
}