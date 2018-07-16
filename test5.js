const expect = require("chai").expect;
const app = require("./app");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";


describe("testing of fifth question", function () {
    it("get top batsman", async function () {
        let expectedResult = [{ _id: 'AM Rahane', totalRuns: 6 }];
        let result = await app.getScoreOfEachBatsman("testdb", "testMatches", "testDeliveries", 2017);
        expect(result).deep.equal(expectedResult);
    });
    it("wrong data", async function () {
        let expectedResult = [{ _id: 'AM Rahane', totalRuns: 6 }];
        let result = await app.getScoreOfEachBatsman("testdb", "matchesWrong", "deliveriesWrong", 2017);
        expect(result).deep.equal(expectedResult);
    });
});

