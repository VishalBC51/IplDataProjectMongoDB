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
                    // console.log(data);
                    resolve(data);
                });
                conn.close();
            }
        })
    })
}

function getMatchId(database, collections) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                console.log(err.message)
            } else {
                let demo = conn.db(database);
                let collection = demo.collection(collections);
              let matchId =  collection.aggregate([{ $match: { season: 2016 } }, { $group: { _id: "$id" } }])
                    .toArray(function (err, data) {
                        // console.log(data);
                        resolve(data);
                    });
                conn.close();
            }
        })
    })
}


module.exports = {
    matchesPerYear: matchesPerYear
}
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

