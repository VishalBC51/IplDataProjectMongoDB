let express = require("express");
let app = express();
let appValues = require("./app.js");
app.set("view engine", "ejs");
app.use(express.static("public"));



appValues.matchesPerYear("iplData", "matches").then(function (data) {
    matchesPerYear = data;

});

app.get("/1", function (req, res) {
    res.render("index1", { matchesPerYear: JSON.stringify(matchesPerYear) });
});


appValues.seasonPerTeamWinningVar("iplData", "matches", "deliveries").then(function (data) {
    seasonPerTeamWinningVar = data;
});

app.get("/2", function (req, res) {
    console.log(seasonPerTeamWinningVar)
    res.render("index2", { seasonPerTeamWinningVar: JSON.stringify(seasonPerTeamWinningVar) });
});
appValues.getExtraRunsPerTeam("iplData", "matches", "deliveries", 2016).then(function (data) {
    getExtraRunsPerTeam = data;
});
app.get("/3", function (req, res) {
    
    res.render("index3", { getExtraRunsPerTeam: JSON.stringify(getExtraRunsPerTeam) });
});

appValues.getEconomicRateOfEachBowler("iplData", "matches", "deliveries", 2015).then(function (data) {
    getEconomicRateOfEachBowler = data;
});

app.get("/4", function (req, res) {
    res.render("index4", { getEconomicRateOfEachBowler: JSON.stringify(getEconomicRateOfEachBowler) });
});

appValues.getScoreOfEachBatsman("iplData", "matches", "deliveries", 2017).then(function (data) {
    getScoreOfEachBatsman = data;
});

app.get("/5", function (req, res) {
    res.render("index5", { getScoreOfEachBatsman: JSON.stringify(getScoreOfEachBatsman) });
});



app.listen(3003);