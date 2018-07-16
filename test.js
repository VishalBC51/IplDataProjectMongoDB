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
});
describe("testing second question", function () {
    it("should return the respective matches with year and count", async function () {
        const expectedResult = [{
            _id: { season: 2008, winner: 'Chennai Super Kings' },
            count: 1
        },
        {
            _id: { season: 2009, winner: 'Royal Challengers Bangalore' },
            count: 2
        },
        {
            _id: { season: 2015, winner: 'Chennai Super Kings' },
            count: 1
        },
        {
            _id: { season: 2015, winner: 'Kolkata Knight Riders' },
            count: 1
        },
        { _id: { season: 2015, winner: 'Rajasthan Royals' }, count: 1 },
        { _id: { season: 2016, winner: 'Gujarat Lions' }, count: 1 },
        {
            _id: { season: 2016, winner: 'Kolkata Knight Riders' },
            count: 1
        },
        {
            _id: { season: 2016, winner: 'Rising Pune Supergiants' },
            count: 1
        },
        {
            _id: { season: 2016, winner: 'Royal Challengers Bangalore' },
            count: 1
        },
        {
            _id: { season: 2017, winner: 'Sunrisers Hyderabad' },
            count: 1
        }];
        let result = await app.seasonPerTeamWinningVar("testdb", "testMatches", "TestDeliveries");
        expect(result).deep.equal(expectedResult);
    });

    it("it should return result object even when any one null or undefined present in data", async function () {
        const expectedResult = [];
        let result = await app.seasonPerTeamWinningVar("testdb", "testEmpty", "testEmpty");
        expect(result).deep.equal(expectedResult);
    });
    it("Wrong Data", async function () {
        const expectedResult = [{
            _id: { season: 2008, winner: 'Chennai Super Kings' },
            count: 1
        },
        {
            _id: { season: 2009, winner: 'Royal Challengers Bangalore' },
            count: 2
        },
        {
            _id: { season: 2015, winner: 'Chennai Super Kings' },
            count: 1
        },
        {
            _id: { season: 2015, winner: 'Kolkata Knight Riders' },
            count: 1
        },
        { _id: { season: 2015, winner: 'Rajasthan Royals' }, count: 1 },
        { _id: { season: 2016, winner: 'Gujarat Lions' }, count: 1 },
        {
            _id: { season: 2016, winner: 'Kolkata Knight Riders' },
            count: 1
        },
        {
            _id: { season: 2016, winner: 'Rising Pune Supergiants' },
            count: 1
        },
        {
            _id: { season: 2016, winner: 'Royal Challengers Bangalore' },
            count: 1
        },
        {
            _id: { season: 2017, winner: 'Sunrisers Hyderabad' },
            count: 1
        }];
        let result = await app.seasonPerTeamWinningVar("testdb", "matchesWrong", "deliveriesWrong");
        expect(result).deep.equal(expectedResult);
    });
})

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


