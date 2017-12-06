const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config.json")["test"];
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL || config.DATABASE_URL, {
    dialect: "postgres",
    native: true,
    ssl: true
});

const checkFileName = (file) => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
};

const createModel = (file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
};

const associateWithDatabase = (modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
};

fs.readdirSync(__dirname)
    .filter((file) => checkFileName(file))
    .forEach((file) => createModel(file));

Object.keys(db).forEach((modelName) => associateWithDatabase(modelName));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;