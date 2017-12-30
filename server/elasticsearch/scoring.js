const foldHits = (hits) => {
    let folded = [];
    let result = [];

    hits.forEach((hit) => {
        folded[hit._source.key] = hit;
        folded[hit._source.key].count = 0;
    });

    hits.forEach((hit) => {
        folded[hit._source.key].count++;
    });

    for (key in folded) {
        if (folded.hasOwnProperty(key)) {
            result.push(folded[key]);
        }
    };

    return result;
};

const calculateScore = (hits) => {
    const factor = 1;
    const countCoefficient = 0.1;
    const relevanceCoefficient = 0;
    const ratingCoefficient = 0.01;

    let countFactor = 0;
    let ratingFactor = 0;

    hits.forEach((hit) => {
        countFactor = factor + (hit.count * countCoefficient);
        ratingFactor = factor + (hit._source.rating * ratingCoefficient);
        hit._score = hit._score * countFactor * ratingFactor;
    });

    return hits;
};

const scoreComparsion = (leftHit, rightHit) => {
    if (leftHit._score < rightHit._score) {
        return 1;
    } else if (leftHit._score > rightHit._score) {
        return -1;
    }
    return 0;
};

const reduceHits = (hits) => {
    const amount = 3;

    hits.sort(scoreComparsion)
    if (hits.length >= amount) {
        return hits.slice(0, amount);
    }
    return hits;
};

module.exports.handleHits = (hits) => {
    let result = calculateScore(foldHits(hits));

    return reduceHits(result);
};