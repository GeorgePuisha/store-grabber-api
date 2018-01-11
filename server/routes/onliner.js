const express = require("express");
const needle = require("needle");
const elasticsearch = require("../elasticsearch/index");

const onliner = "https://catalog.api.onliner.by/search/products?query=";

const reduceInformation = (product, email) => {
    return {
        key: product.key,
        name: product.extended_name,
        description: product.description,
        image: product.images.header,
        price: product.prices.price_min.amount,
        url: product.html_url,
        rating: product.reviews.rating,
        email,
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
        resp.json(createResponse(res.body.products));
    });
};

module.exports.lastPage = (req, resp) => {
    const url = onliner + req.params.query;
    needle.get(url, (err, res) => {
        if (res.body.page) {
            resp.json(res.body.page.last);
        } else {
            resp.json(0);
        }
    });
};

module.exports.reduceInformation = reduceInformation;

const recommended = (req, resp) => {
    //elasticsearch.getAllDocuments();
    elasticsearch.getDocuments(req.params.query, resp);
};

module.exports.recommended = recommended;