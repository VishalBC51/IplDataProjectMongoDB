const expect = require("chai").expect;
const app = require("./app");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";

describe("testing first question", function () {
    it("should return total number of matches played per year", async function () {
        const expectedResult = [{ _id: 2015, total: 3 },
        { _id: 2017, total: 1 },
        { _id: 2008, total: 1 },
        { _id: 2009, total: 2 },
        { _id: 2016, total: 4 }];
        let result = await app.matchesPerYear("testdb", "testMatches");
        expect(result).deep.equal(expectedResult);
    });

    it("it should return result object even when any one null or undefined present in data", async function () {
        const expectedResult = [];
        let result = await app.matchesPerYear("testdb", "testEmpty");
        expect(result).deep.equal(expectedResult);
    });

    it("empty csv", async function () {
        const expectedResult = [];
        let result = await app.matchesPerYear("testdb", "testEmpty");
        expect(result).deep.equal(expectedResult);
    });

    it("wrong data in database", async function () {
        const expectedResult = [{ _id: 2015, total: 3 },
        { _id: 2017, total: 1 },
        { _id: 2008, total: 1 },
        { _id: 2009, total: 2 },
        { _id: 2016, total: 4 }];
        let result = await app.matchesPerYear("testdb", "matchesWrong");
        expect(result).deep.equal(expectedResult);
    });

    // it("exception", async function () {
    //     const expectedResult = [{ _id: 2015, total: 3 },
    //     { _id: 2017, total: 1 },
    //     { _id: 2008, total: 1 },
    //     { _id: 2009, total: 1 },
    //     { _id: 2016, total: 4 }];
    //     let result = await app.matchesPerYear("testdb", "testMatches");
    //     expect(result).deep.equal(expectedResult);
    // });
});