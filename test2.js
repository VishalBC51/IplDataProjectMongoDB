const expect = require("chai").expect;
const app = require("./app");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";



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