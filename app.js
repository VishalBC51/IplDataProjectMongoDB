let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";

// matchesPerYear("iplData", "matches")
function matchesPerYear(database, collections) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                console.log(err.message)
            } else {
                let demo = conn.db(database);
                let collection = demo.collection(collections);
                collection.aggregate([
                    {
                        $group: {
                            _id: "$season",
                            total: { $sum: 1 }
                        }
                    }
                ]).toArray(function (err, data) {
                    // console.log(data);
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}

seasonPerTeamWinningVar("testdb", "testMatches", "TestDeliveries");
function seasonPerTeamWinningVar(database, collectionMatch, collectionDeliveries) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                console.log(err.message)
            } else {
                let demo = conn.db(database);
                let collectionm = demo.collection(collectionMatch);
                collectionm.aggregate([
                    {
                        "$group": {
                            "_id": {
                                "season": "$season",
                                "winner": "$winner",
                            },
                            "count": {
                                $sum: 1
                            }
                        }
                    },
                    {
                        "$sort": {
                            "_id": 1
                        }
                    }
                ]).toArray(function (err, data) {
                    console.log(data);
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}


// getExtraRunsPerTeam("testdb", "testMatches","testDeliveries", 2016);
function getExtraRunsPerTeam(database, collectionMatch, collectionDeliveries, year) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                console.log(err.message)
            } else {
                let demo = conn.db(database);
                let collectionm = demo.collection(collectionMatch);
                collectionm.aggregate([
                    {
                        $match: {
                            season: year
                        }
                    },
                    {
                        $lookup: {
                            from: collectionDeliveries,
                            localField: "id",
                            foreignField: "match_id",
                            as: "deliveriesNew"
                        }
                    },
                    {
                        $unwind: "$deliveriesNew"
                    },
                    {
                        $project: {
                            _id: null,
                            "deliveriesNew": {
                                "bowling_team": 1,
                                "extra_runs": 1
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$deliveriesNew.bowling_team",
                            total: {
                                $sum: "$deliveriesNew.extra_runs"
                            }
                        }
                    }
                ]).toArray(function (err, data) {
                    // console.log(data);
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}


// getEconomicRateOfEachBowler("testdb", "testMatches", "testDeliveries", 2015);
function getEconomicRateOfEachBowler(database, collectionMatch, collectionDeliveries, year) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                console.log(err.message)
            } else {
                let ipldb = conn.db(database);
                let matchesCol = ipldb.collection(collectionMatch);
                matchesCol.aggregate([
                    {
                        "$match": {
                            season: year
                        }
                    },
                    {
                        $lookup: {
                            from: collectionDeliveries,
                            localField: "id",
                            foreignField: "match_id",
                            as: "deliversNew"
                        }
                    },
                    {
                        $unwind: "$deliversNew"
                    }, {
                        $group: {
                            _id: "$deliversNew.bowler",
                            totalRuns: {
                                $sum: "$deliversNew.total_runs"
                            },
                            totalBalls: {
                                $sum: {
                                    $cond: {
                                        if: {
                                            $gt: ["$deliversNew.wide_runs", 0]
                                        },
                                        then: 0,
                                        else: {
                                            $cond: {
                                                if: {
                                                    $gt: ["$deliversNew.noball_runs", 0]
                                                },
                                                then: 0,
                                                else: 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            economy: {
                                $divide: [{
                                    $multiply: ["$totalRuns", 6]
                                }, "$totalBalls"]
                            }
                        }
                    },
                    {
                        $sort: {
                            economy: 1
                        }
                    },
                    {
                        $limit: 10
                    }
                ]).toArray(function (err, data) {
                    // console.log(data);
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}

getScoreOfEachBatsman("testdb", "testMatches", "testDeliveries", 2017);
function getScoreOfEachBatsman(database, collectionMatch, collectionDeliveries, year) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                console.log(err.message)
            } else {
                let ipldb = conn.db(database);
                let matchesCol = ipldb.collection(collectionMatch);
                matchesCol.aggregate([
                    {
                        "$match": {
                            season: year
                        }
                    }, {
                        $lookup: {
                            from: collectionDeliveries,
                            localField: "id",
                            foreignField: "match_id",
                            as: "deliversNew"
                        }
                    },
                    {
                        $unwind: "$deliversNew"
                    },
                    {
                        $group: {
                            _id: "$deliversNew.batsman",
                            totalRuns: {
                                $sum: "$deliversNew.batsman_runs"
                            }
                        }
                    }
                ]).toArray(function (err, data) {
                    console.log(data);
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}

module.exports = {
    matchesPerYear: matchesPerYear,
    seasonPerTeamWinningVar:seasonPerTeamWinningVar,
    getExtraRunsPerTeam: getExtraRunsPerTeam,
    getEconomicRateOfEachBowler: getEconomicRateOfEachBowler,
    getScoreOfEachBatsman:getScoreOfEachBatsman
}

// db.testDeliveries.aggregate([{ $match: { match_id : {$in:[db.testMatches.aggregate([{ $match: { season: 2016 } }, { $group: { _id: "$id" } }])]} } },
// {
//     $group: {
//         _id: "$bowling_team",
//         extraRuns: {
//             $sum: "$extra_runs"
//         }
//     }
// }
// ])

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");

//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     else
//   {     
//     console.log("hee")
//   }
//   db.close();
//   });
//   let customers = dbo.collections("customers");
//   customers.insert({name:"", age: 25});
//   dbo.customers.find({});
// });

// mongoimport -d 'demo' -c 'matches' --type csv --headerline --file /home/dev/Projects/dataProject/DataProject-vishal/data/Testdeliveries3q.csv
// db.maches.aggregate([
// {
//     $match:{batting_team:"Delhi Daredevils"}
// },
// {
//     $group:{
//         _id:"$match_id",
//         total:{
//             $sum :"$total_runs"
//         }
//     }
// }
// ])

// db.maches.aggregate([

//     {
//         $group:{
//             _id:"$match_id",
//             total:{
//                 $sum :"$total_runs"
//             }
//         }
//     }
//     ])



///this will give matches played per season
// db.maches.aggregate([

//     {
//         $group:{
//             _id:"$match_id",
//             total:{ $sum :1 }
//         }
//     }
//     ])

//this will give the id of 2016 or 2015 --pending
// db.maches.find(
//     {
//         match_id:{
//             $in:[577]
//         }
//     },
//         {
//             batting_team:1
//             match_id :1
//         }
//     )


// db.maches.aggregate([ {$match :{match_id:{$in:[577,578]}}}, { $group:{ _id:"$match_id",total:{$sum:"$ball"}}}]).pretty()

