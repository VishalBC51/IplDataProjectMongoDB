const expect = require("chai").expect;
const app = require("./app");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";


describe("testing of third question", function () {
    it("get extra runs per team", async function () {
        let expectedResult = [{ _id: 'Kolkata Knight Riders', total: 2 },
        { _id: 'Mumbai Indians', total: 2 }];
        let result = await app.getExtraRunsPerTeam("testdb", "testMatches", "testDeliveries", 2016);
        expect(result).deep.equal(expectedResult);
    });
    it("it should return result object even when any one null or undefined present in data", async function () {
        const expectedResult = [];
        let result = await app.getExtraRunsPerTeam("testdb", "testEmpty","testEmpty",2017);
        expect(result).deep.equal(expectedResult);
    });
    it("wrong data", async function () {
        let expectedResult = [{ _id: 'Kolkata Knight Riders', total: 2 },
        { _id: 'Mumbai Indians', total: 2 }];
        let result = await app.getExtraRunsPerTeam("testdb", "matchesWrong", "deliveriesWrong", 2016);
        expect(result).deep.equal(expectedResult);
    });
});