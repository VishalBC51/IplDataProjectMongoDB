const expect = require("chai").expect;
const app = require("./app");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";


describe("testing of forth question", function () {
    it("get econimic rate per player", async function () {
        let expectedResult = [{ _id: 'AD Russell', economy: 24 }];
        let result = await app.getEconomicRateOfEachBowler("testdb", "testMatches", "testDeliveries", 2015);
        expect(result).deep.equal(expectedResult);
    });
    it("wrong data", async function () {
        let expectedResult = [{ _id: 'AD Russell', economy: 24 }];
        let result = await app.getEconomicRateOfEachBowler("testdb", "matchesWrong", "deliveriesWrong", 2015);
        expect(result).deep.equal(expectedResult);
    });
});
