d3.json("data/samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

  // Sort the data array using the greekSearchResults value
    data.sort(function(a, b) {
    return parseFloat(b.wfreq) - parseFloat(a.wfreq);
    });

  // Slice the first 10 objects for plotting
    data = data.slice(0, 10);

  // Reverse the array due to Plotly's defaults
    data = data.reverse();

  // Trace1 for the Greek Data
    var trace1 = {
        x: data.metadata.map(row => row.wfreq),
        y: data.metadata.map(row => row.id),
        text: data.metadata.map(row => row.id),
        name: "Belly",
        type: "bar",
        orientation: "h"
    };

  // data
    var chartData = [trace1];

  // Apply the group bar mode to the layout
    var layout = {
        title: "Greek gods search results",
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", chartData, layout);
    })


