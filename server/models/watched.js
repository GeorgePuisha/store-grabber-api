"use strict";
module.exports = (sequelize, DataTypes) => {
    var Watched = sequelize.define("Watched", {
        key: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.STRING,
        url: DataTypes.STRING,
        status: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: (models) => {
                Watched.belongsTo(models.User);
            }
        }
    });
    return Watched;
};