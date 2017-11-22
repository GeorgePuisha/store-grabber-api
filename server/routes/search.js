const express = require("express");
const needle = require("needle");
const cheerio = require("cheerio");

const onliner = "https://catalog.api.onliner.by/search/products?query=";

const reduceInformation = (product) => {
    let reduced = {};
    reduced.key = product.key;
    reduced.name = product.name;
    reduced.description = product.description;
    reduced.image = product.images.icon;
    reduced.price = product.prices.price_min.amount || 0;
    return reduced;
};

const isActive = (product) => {
    return product.status === "active";
};

const isAvailable = (product) => {
    return product.prices !== null;
};

const createResponse = (products) => {
    let response = [];
    for (let i = 0; i < products.length; i++) {
        if (isActive(products[i]) && isAvailable(products[i]))
            response.push(reduceInformation(products[i]));
    }
    return response;
};

const search = (req, resp) => {
    const url = onliner + req.params.query
    needle.get(url, function(err, res, body) {
        resp.status(200).json(createResponse(res.body.products));
    });
};

module.exports = search;
