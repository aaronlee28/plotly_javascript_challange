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
        color: 'light blue'},
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
    var trace2 ={
        x: otu_ids,
        y: values,
        text: labels,
        mode: "markers",
        type: 'bubble',
        marker: {
            size: values,
            color: otu_ids
            }
    };
    var chartData2 = [trace2]
    var layout2 =  {
        xaxis: { title: "Id's" },
        hovermode: "closest",
        margin: { t: 0 },
        
    }
    
    Plotly.newPlot("bubble", chartData2, layout2);

    // Build Gauge (Bonus)
    var trace3 = {
        
    }
})};


function demoInfo(id){
    d3.json("data/samples.json").then((importedData) => {
    var data = importedData;
    var metadata= data.metadata;
    var results= metadata.filter(object => object.id == id);
    var result= results[0]
    var box = d3.select("#sample-metadata");
    Object.entries(result).forEach(([key, value]) => {
        box.append("h5").text(`${key}: ${value}`);
    });
    });

}
function init(){
    var dropdown = d3.select('#selDataset');
    d3.json("data/samples.json").then((importedData) => {
        var data = importedData;
        names = data.names;
        names.forEach((name)=>{
            dropdown.append('option').text(name).property('value',name)
        }); 
        const initial = names[0]
        getData(initial);
        demoInfo(initial);
        });
}    
function optionChanged(newid){
    getData(newid)
    demoInfo(newid)
}

init();