const horizontal_url = '/get_horizontal'

// Perform a GET request to the query URL.
d3.json(horizontal_url).then(function(data) {

    // Create a variable to represent the data length.
    var dataLength = Object.keys(data).length

    // Create an empty list for each of the four streaming platforms.
    var netflix = [];
    var amazonPrime = [];
    var disneyPlus = [];
    var hulu = [];

    // Loop through the data.
    for (let i = 0; i < dataLength; i++) {

        // Add each row to its corresponding list based on platform type.
        if (data[i].platform == 'Netflix') {
            netflix.push(data[i].release);
        } else if (data[i].platform == 'Amazon Prime') {
            amazonPrime.push(data[i].release);
        } else if (data[i].platform == 'Disney Plus') {
            disneyPlus.push(data[i].release);
        } else if (data[i].platform == 'Hulu') {
            hulu.push(data[i].release);
        };

    };

    // Log our four lists into the console.
    console.log(netflix)
    console.log(amazonPrime)
    console.log(disneyPlus)
    console.log(hulu)

    // Create histogram for each platform by using the release year data.
    // Netflix
    // Create histogram for each platform by using the release year data.
    // Netflix
    var trace1 = {
        x: netflix,
        type: 'histogram',
        histnorm: 'percent',
        opacity: 0.5,
        marker: {
            color: '#17226a'
        },
        xbins: {
            end: 2022, 
            size: 10,
            start: 1920
        },
        name: 'Netflix'
    };

    // Amazon Prime
    var trace2 = {
        x: amazonPrime,
        type: 'histogram',
        histnorm: 'percent',
        opacity: 0.5,
        marker: {
            color: '#9e855c'
        },
        xbins: {
            end: 2022, 
            size: 10,
            start: 1920
        },
        name: 'Amazon Prime'
    };

    // Disney Plus
    var trace3 = {
        x: disneyPlus,
        type: 'histogram',
        histnorm: 'percent',
        opacity: 0.7,
        marker: {
            color: '#c5cfd3'
        },
        xbins: {
            end: 2022, 
            size: 10,
            start: 1920
        },
        name: 'Disney Plus'
    };

    // Hulu
    var trace4 = {
        x: hulu,
        type: 'histogram',
        histnorm: 'percent',
        opacity: 0.5,
        marker: {
            color: '#385963'
        },
        xbins: {
            end: 2022, 
            size: 10,
            start: 1920
        },
        name: 'Hulu'
    };

     // Combine all four histograms as an array for our plot.
     var histdata = [trace1, trace2, trace3, trace4];

     const layout = {
        xaxis: {
          title: "Percent",
          font: { size: 18, color: "#1f77b4" },
        },
        yaxis: {
          title: "Decade",
          font: { size: 18, color: "#1f77b4" },
        },
        barmode: "overlay",
        legend: {
          title: "Platform",
          font: { size: 16, color: "#1f77b4" },
        },
        margin: { t: 30 },
        legend: {
          title: "",
          font: {
            family: "Fira Sans",
            size: 16,
            color: "#343A3F"
          }
        },
      };
 
     // Create checkboxes for each platform
     const platforms = [
         { name: "Netflix", trace: trace1 },
         { name: "Amazon Prime", trace: trace2 },
         { name: "Disney Plus", trace: trace3 },
         { name: "Hulu", trace: trace4 },
     ];
 
     const container = document.getElementById("decadesCheckboxes");
     platforms.forEach((platform) => {
         const checkbox = document.createElement("input");
         checkbox.type = "checkbox";
         checkbox.name = platform.name;
         checkbox.value = platform.name;
         checkbox.id = platform.name;
         checkbox.checked = true;
 
         const decadesLabel = document.createElement("label");
         decadesLabel.htmlFor = platform.name;
         decadesLabel.appendChild(document.createTextNode(platform.name));
 
         container.appendChild(checkbox);
         container.appendChild(decadesLabel);
 
         checkbox.addEventListener("change", updateChart);
     });
 
     function updateChart() {
         const selectedPlatforms = platforms
             .filter((platform) => document.getElementById(platform.name).checked)
             .map((platform) => platform.trace);
 
         Plotly.newPlot("decades", selectedPlatforms, layout);
     }
 
     // Call updateChart function to render the initial chart
     updateChart();
 });