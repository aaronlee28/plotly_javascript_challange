function getData(){
  d3.json("data/samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);
    var ids = data.samples[0].otu_ids.slice(0,10);
    console.log(ids);
    var sampleValues =  data.samples[0].sample_values.slice(0,10);
    console.log(sampleValues)
    var labels = data.samples[0].otu_labels.slice(0,10);
    console.log(labels)
    var trace1 = {
      x: sampleValues,
      y: ids,
      text: labels,
      marker: {
      color: 'blue'},
      type:"bar",
      orientation: "h",
    };
    var chartData = [trace1]
    var layout = {
      title: "",
      margin:{
        l:100,
        r:100,
        t:100,
        b:100
      }
    }
    Plotly.newPlot('bar', chartData, layout)
})};
getData()

