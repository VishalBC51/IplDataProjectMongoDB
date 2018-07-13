let seasonPerTeamWinningVar = (window.data);
var seasons = Object.keys(seasonPerTeamWinningVar)
let globalarr = [];
let teams = [];

for (let i = 0; i < seasons.length; i++) {
    teams.push(...Object.keys(seasonPerTeamWinningVar[seasons[i]][0]))
}
teams = teams.filter(word => word.length !== 0);
teams = [...new Set(teams)];
for (team in teams) {
    let arr = [];
    for (year in seasons) {
        if (seasonPerTeamWinningVar[seasons[year]][0].hasOwnProperty(teams[team]))
            arr.push(seasonPerTeamWinningVar[seasons[year]][0][teams[team]])
        else
            arr.push(0)
    }
    let obj = {
        name: teams[team],
        data: arr
    };
    globalarr.push(obj)
}

let container3 = document.createElement('div');
document.body.appendChild(container3);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container3,
        height: 400,
        type: 'bar'
    },
    title: {
        text: 'Stacked bar chart'
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
