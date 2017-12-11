const express = require("express");
const needle = require("needle");
const amqp = require("../controllers/amqp");

const onliner = "https://catalog.api.onliner.by/search/products?query=";

const reduceInformation = (product) => {
    return {
        key: product.key,
        name: product.extended_name,
        description: product.description,
        image: product.images.header,
        price: product.prices.price_min.amount,
        url: product.html_url,
        status: "active"
    };
};

const isActive = (product) => {
    return product.status === "active";
};

const isAvailable = (product) => {
    return product.prices !== null;
};

const createResponse = (products) => {
    const response = [];
    if (products) {
        products.forEach((product) => {
            if (isActive(product) && isAvailable(product)) {
                response.push(reduceInformation(product));
            }
        });
    }
    return response;
};

module.exports.search = (req, resp) => {
    const url = onliner + req.params.query + "&page=" + req.params.page;
    needle.get(url, (err, res) => {
        if (!err) {
            resp.json(createResponse(res.body.products));
        } else {
            amqp.publishNotification({
                status: "error",
                text: "An error has occured! Onliner.com seems to be offline"
            });
        }
    });
};

module.exports.lastPage = (req, resp) => {
    const url = onliner + req.params.query;
    needle.get(url, (err, res) => {
        if (!err) {
            resp.json(res.body.page.last);
        } else {
            amqp.publishNotification({
                status: "error",
                text: "An error has occured! Onliner.com seems to be offline"
            });
        }
    });
};

module.exports.reduceInformation = reduceInformation;