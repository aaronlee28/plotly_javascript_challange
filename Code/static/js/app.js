function getData(id){
  d3.json("data/samples.json").then((importedData) => {
    var data = importedData;
    var samples = data.samples;
    var results = samples.filter (object => object.id == id);
    var result = results[0]
    var otu_ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
    
    // Build Bar Chart 

    var trace1 = {
        x: values.slice(0,10).reverse(),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
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
    Plotly.newPlot("bar", chartData, layout);

    // Build Bubble Chart 
    var trace2 = {
        x: otu_ids.slice(0,10),
        y: values.slice(0, 10).map(otuID => `OTU ${otuID}`),
        text: labels,
        marker: {
        size: values,
        color: otu_ids},
        type:"bubble",
        };
    var chartData2 = [trace2]
    var layout2 =  {
        x: otu_ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
            size: values,
            color: otu_ids
            ,
            }
    }
    Plotly.newPlot("bubble", chartData2, layout2);
})};
getData(940)

// function optionChanged(id) {
//     getData(id)
// }


// // create the function for the initial data rendering
// function init() {
//     // select dropdown menu 
//     var dropdown = d3.select("#selDataset");

//     // read the data 
//     d3.json("data/samples.json").then((datas)=> {
//         console.log(datas)

//         // get the id data to the dropdwown menu
//         datas.names.forEach(function(name) {
//             dropdown.append("option").text(name).property("value");
//         });

//         // call the functions to display the data and the plots to the page
//         getData(datas.names[0]);
//         // getDemoInfo(datas.names[0]);
//     });
// }

// init();

