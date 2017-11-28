"use strict";
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        nickname: DataTypes.STRING
    }, {
        classMethods: {
            associate: (models) => {
                User.hasMany(models.Watched);
            }
        }
    });
    return User;
};