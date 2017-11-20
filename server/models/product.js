"use strict";
module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define("Product", {
        title: DataTypes.STRING,
        desc: DataTypes.STRING,
        url: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Product.belongsTo(models.User);
            }
        }
    });
    return Product;
};
