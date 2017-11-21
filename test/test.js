const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const expect = chai.expect;

var config = require("../server/config.json")[process.env.NODE_ENV];
var Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL || config.DATABASE_URL, {
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
    it("should connect to db", (done) => {
        let isConnected = false;
        sequelize
            .authenticate()
            .then(() => {
                isConnected = true;
                expect(isConnected).to.be.true;
                done();
            });
    });
});

describe("Testing routes", () => {
    describe("\"/not_exist/\" route", () => {
        it("should return 404", (done) => {
            chai.request(server)
                .get("/not_exist/")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("\"/login/\" with not empty body", () => {
        const user = {
            email: "email",
            nickname: "nickname"
        };

        it("should update user", (done) => {
            chai.request(server)
                .post("/api/login/")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should return user's credentials", (done) => {
            chai.request(server)
                .post("/api/login/")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.email.should.eql(user.email);
                    done();
                });
        });
    });
});
