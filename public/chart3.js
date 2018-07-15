let getExtraRunsPerTeam = (window.data);
extraRun = [];
matche = [];

for(var i=0;i<Object.keys(getExtraRunsPerTeam).length;i++)
{
  matche.push(getExtraRunsPerTeam[i]["_id"]);
  extraRun.push(getExtraRunsPerTeam[i]["total"]);
}

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