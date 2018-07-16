let getEconomicRateOfEachBowler = (window.data);
let playerName = [];
let economy = [];

for (var i = 0; i < Object.keys(getEconomicRateOfEachBowler).length; i++) {
    playerName.push(getEconomicRateOfEachBowler[i]["_id"]);
    economy.push(getEconomicRateOfEachBowler[i]["economy"]);
}

let container4 = document.createElement("div");
document.body.appendChild(container4);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container4,
        height: 400,
        type: "column"
    },
    title: {
        text: "IPL Economic Rate Per Player"
    },
    xAxis: {
        categories: playerName
    },
    yAxis: {
        text: "economy",
        data: economy
    },
    series: [{
        name:"Economic Rate per player",
        text: "economy",
        data: economy
    }]
});