let getScoreOfEachBatsman = (window.data);
let  BatsName = [];
let runs= [];
for(var i=0;i<Object.keys(getScoreOfEachBatsman).length;i++){
    BatsName.push(getScoreOfEachBatsman[i]["_id"]);
    runs.push(getScoreOfEachBatsman[i]["totalRuns"]);
}


let container5 = document.createElement("div");
document.body.appendChild(container5);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container5,
        height: 400,
        type: "column"
    },
    title: {
        text: "IPL highest run scorer in 2017"
    },
    xAxis: {
        categories: BatsName
    },
    yAxis: {
        text: "runs",
        data: runs
    },
    series: [{
        name:"Runs vs batsmen",
        text: "runs",
        data: runs
    }]
});