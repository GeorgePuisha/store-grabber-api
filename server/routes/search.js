const express = require("express");
const needle = require("needle");

const onliner = "https://catalog.api.onliner.by/search/products?query=";

const reduceInformation = (product) => {
    return {
        key: product.key,
        name: product.name,
        description: product.description,
        image: product.images.icon,
        price: product.prices.price_min.amount,
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
    let response = [];
    for (let i = 0; i < products.length; i++) {
        if (isActive(products[i]) && isAvailable(products[i]))
            response.push(reduceInformation(products[i]));
    }
    return response;
};

const search = (req, resp) => {
    const url = onliner + req.params.query
    needle.get(url, (err, res, body) => {
        resp.status(200).json(createResponse(res.body.products));
    });
};

module.exports = search;
