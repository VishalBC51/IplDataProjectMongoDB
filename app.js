let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";

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
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}


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
                    conn.close();
                    resolve(data);
                });

            }
        })
    })
}


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
                    conn.close();
                    resolve(data);
                });

            }
        })
    })
}


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
                    conn.close();
                    resolve(data);
                });

            }
        })
    })
}

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
                        $match: {
                            season: year

                        },
                    }, {
                        $lookup: {
                            from:  collectionDeliveries,
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
                    },
                    {
                        $sort: {
                            totalRuns: -1
                        }
                    },
                    {
                        $limit: 10
                    }
                ]).toArray(function (err, data) {
                    conn.close();
                    resolve(data);
                });
            }
        })
    })
}

module.exports = {
    matchesPerYear: matchesPerYear,
    seasonPerTeamWinningVar: seasonPerTeamWinningVar,
    getExtraRunsPerTeam: getExtraRunsPerTeam,
    getEconomicRateOfEachBowler: getEconomicRateOfEachBowler,
    getScoreOfEachBatsman: getScoreOfEachBatsman
}
