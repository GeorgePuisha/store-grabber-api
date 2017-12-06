const redis = require("redis").createClient(process.env.REDIS_URL);
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
    models.Watched.findCreateFind({
        where: {
            key: product.key,
            userId: user.id
        },
        defaults: {
            key: product.key,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            url: product.url,
            status: product.status,
            userId: user.id
        }
    }).then((watched) => {
        redis.rpush([watched[0].dataValues.id, product.price]);
        resp.status(200).json();
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
        resp.status(200).json(watchedList);
    })
};

module.exports.getAllWatched = (req, resp) => {
    findUserByEmail(req.params.email).then((user) => watchedByUserId(user, resp));
};

const destroyWatched = (watched, resp) => {
    models.Watched.destroy({
        where: {
            id: watched.id
        }
    }).then(() => {
        redis.del(watched.id);
        resp.status(200).json();
    });
};

const findAndDestroyWatched = (user, key, resp) => {
    models.Watched.find({
        where: {
            key,
            userId: user.id
        }
    }).then((watched) => destroyWatched(watched, resp));
};

module.exports.deleteFromWatched = (req, resp) => {
    findUserByEmail(req.params.email).then((user) => findAndDestroyWatched(user, req.params.key, resp));
};

const watchedByUserIdAndKey = (user, key, resp) => {
    models.Watched.find({
        where: {
            key,
            userId: user.id
        }
    }).then((watched) => {
        resp.status(200).json(watched);
    });
};

module.exports.getWatchedByKey = (req, resp) => {
    findUserByEmail(req.params.email).then((user) => watchedByUserIdAndKey(user, req.params.key, resp));
};