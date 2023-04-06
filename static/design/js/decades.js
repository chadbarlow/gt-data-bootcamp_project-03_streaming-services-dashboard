const url = '/get_horizontal'

// Perform a GET request to the query URL.
d3.json(url).then(function(data) {

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

    // Define the plot's layout.
    var layout = {
        barmode: 'overlay',
        title: 'Movie Release Times',
        xaxis: {
            title: 'Decade'
        },
        yaxis: {
            title: '% of All Movies on Platform'
        }
    };

    Plotly.newPlot('decades', histdata, layout);

});