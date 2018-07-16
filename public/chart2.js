let seasonPerTeamWinningVar = (window.data);
var seasons = [];
var globalarr = [];
var teams = [];
function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property]["season"];
        if (!acc[key]) {
            acc[key] = [];
        }
        var temp = {};
        temp[obj["_id"]["winner"]] = obj["count"]
        acc[key].push(temp);
        return acc;
    }, {});
}
var seasonPerTeamWinning = groupBy(seasonPerTeamWinningVar, "_id");

for (var i = 0; i < seasonPerTeamWinningVar.length; i++) {
    if (!(seasons.includes(seasonPerTeamWinningVar[i]["_id"]["season"]))) { seasons.push(seasonPerTeamWinningVar[i]["_id"]["season"]) }
}

for (var i = 0; i < Object.keys(seasonPerTeamWinning).length; i++) {
    if (seasonPerTeamWinning[seasons[i]].length === 1)
        teams.push(Object.keys(seasonPerTeamWinning[seasons[i]][0]).toString())
    else {
        for (var j = 0; j < seasonPerTeamWinning[seasons[i]].length; j++) {
            teams.push(Object.keys(seasonPerTeamWinning[seasons[i]][j]).toString())
        }
    }
}
teams = [...new Set(teams)];



var globalarr = []
for (var m = 0; m < teams.length; m++) {
    let arr = [];
    for (var n = 0; n < seasons.length; n++) {
        if (seasonPerTeamWinning[seasons[n]].length === 1) {
            if (seasonPerTeamWinning[seasons[n]][0].hasOwnProperty(teams[m])) {
                arr.push(seasonPerTeamWinning[seasons[n]][0][teams[m]])
            }
            else
                arr.push(0)
        }
        else {
            for (var i = 0; i < seasonPerTeamWinning[seasons[n]].length; i++) {
                if (seasonPerTeamWinning[seasons[n]][i].hasOwnProperty(teams[m])) {

                    arr.push(seasonPerTeamWinning[seasons[n]][i][teams[m]])
                    break;
                }
                else if (i === seasonPerTeamWinning[seasons[n]].length - 1) {
                    arr.push(0)
                }
            }
        }
    }
    let obj = {
        name: teams[m],
        data: arr
    };
    globalarr.push(obj)
}

console.log(globalarr)

let container3 = document.createElement('div');
document.body.appendChild(container3);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container3,
        height: 400,
        type: 'bar'
    },
    title: {
        text: 'seasson per team winning'
    },
    xAxis: {
        categories: seasons
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Match won per season'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: globalarr
});
