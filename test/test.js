const config = require("../server/config.json")[process.env.NODE_ENV];

process.env.REDIS_URL = config.REDIS_URL;
process.env.DATABASE_URL = config.DATABASE_URL;

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const expect = chai.expect;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    native: true,
    ssl: true
});

chai.use(chaiHttp);

describe("Testing test system", () => {
    describe("true === true", () => {
        it("should return true", () => {
            return (true === true);
        });
    });
});

describe("Testing DB connection", () => {
    beforeEach(() => {
        process.env.REDIS_URL = config.REDIS_URL;
    });

    it("should connect to db", (done) => {
        let isConnected = false;
        process.env.REDIS_URL = config.REDIS_URL;
        sequelize
            .authenticate()
            .then(() => {
                isConnected = true;
                expect(isConnected).to.be.true;
                done();
            });
    });
});