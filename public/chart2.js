let getExtraRunsPerTeam = (window.data);
let extraRun = [];
let matche = [];
extraRun =  Object.values(getExtraRunsPerTeam);
matche = Object.keys(getExtraRunsPerTeam);

let container1 = document.createElement("div");
document.body.appendChild(container1);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container1,
        height: 400,
        type: "column"
    },
    title: {
        text: "IPL Extra runs Per Team"
    },
    xAxis: {
        categories: matche
    },
    yAxis: {
        text: "extraRun",
        data: extraRun
    },
    series: [{
        text: "extraRun",
        data: extraRun
    }]
});