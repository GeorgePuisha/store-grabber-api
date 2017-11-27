const models = require("../models/index");

const onliner = "https://catalog.api.onliner.by/products/";

const addToList = (req, resp) => {
    models.User.find({
        where: {
            email: req.params.email
        }
    }).then((user) => {
        console.log(user.id)

        models.Product.findOrCreate({
            where: {
                UserId: user.id
            }
        }).then((product) => {

        });
    });
};

module.exports.addToList = addToList;
