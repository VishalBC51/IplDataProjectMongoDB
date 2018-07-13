let  getEconomicRateOfEachBowler = (window.data);
let  playerName= [];
let economy= [];
let obj ={};
let l =getEconomicRateOfEachBowler.length;
for(let i=0;i<l-89;i++){
    obj[getEconomicRateOfEachBowler[i]['key']] = getEconomicRateOfEachBowler[i]['value'];
}
console.log(obj+"JJ");
economy =  Object.values(obj);
playerName = Object.keys(obj);

let container2 = document.createElement("div");
document.body.appendChild(container2);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container2,
        height: 400,
        type: "column"
    },
    title: {
        text: "IPL Econimic Rate Per Player"
    },
    xAxis: {
        categories: playerName
    },
    yAxis: {
        text: "economy",
        data: economy 
    },
    series: [{
        text: "economy",
        data: economy 
    }]
});