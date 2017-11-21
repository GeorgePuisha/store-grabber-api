const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Testing test system", () => {
    describe("true === true", () => {
        it("should return true", () => {
            return (true === true);
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
