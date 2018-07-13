let express = require("express");
let app = express();
let appValues = require("./app.js");
app.set("view engine", "ejs");
app.use(express.static("public"));



appValues.matchesPerYear("testdb","testMatches").then(function (data) {
    matchesPerYear = data;
    
});

app.get("/", function (req, res) {
    res.render("index1", { matchesPerYear: JSON.stringify(matchesPerYear) });
});

// appValues.getExtraRunsPerTeam(dataset1, dataset2).then(function (data) {
//     getExtraRunsPerTeam = data;
// });

// app.get("/3", function (req, res) {
//     res.render("index2", { getExtraRunsPerTeam: JSON.stringify(getExtraRunsPerTeam) });
// });

// appValues.getEconomicRateOfEachBowler(dataset1, dataset2).then(function (data) {
//     getEconomicRateOfEachBowler = data;
// });

// app.get("/4", function (req, res) {
//     res.render("index3", { getEconomicRateOfEachBowler: JSON.stringify(getEconomicRateOfEachBowler) });
// });

// appValues.getScoreOfEachBatsman(dataset1, dataset2).then(function (data) {
//     getScoreOfEachBatsman = data;
// });

// app.get("/5", function (req, res) {
//     res.render("index4", { getScoreOfEachBatsman: JSON.stringify(getScoreOfEachBatsman) });
// });

// appValues.seasonPerTeamWinningVar(dataset1).then(function (data) {
//     seasonPerTeamWinningVar = data;
// });

// app.get("/2", function (req, res) {
//     res.render("index5", { seasonPerTeamWinningVar: JSON.stringify(seasonPerTeamWinningVar) });
// });

app.listen(3002);