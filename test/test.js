const assert = require("assert");
const request = require("request");
const app = require("../app.js");

const base_url = "http://localhost:3000/";

describe("Testing test system", () => {
    describe("true === true", () => {
        it("should return true", () => {
            return(true === true);
        });
    });
});

describe("Server", () => {
    describe("GET /", () => {
        it("should return status code 200", (done) => {
                request.get(base_url, (error, response, body) => {
                assert.equal(200, response.statusCode);
                done();
            });
        });

        it("should return \"Response\"", (done) => {
            request.get(base_url, (error, response, body) => {
                assert.equal("Response", body);
                app.closeServer();
                done();
            });
        });
    });
});
