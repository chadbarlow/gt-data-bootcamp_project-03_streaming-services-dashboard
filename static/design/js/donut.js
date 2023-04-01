function main() {
  let selector = d3.select('#selDataset');
  platformNames = ['Netflix', 'Hulu', 'Disney Plus', 'Amazon Plus'];

  d3.json('complete_vertical.json').then((data) => {
    // console.log(data);    
    platformNames.forEach(element => {
      selector.append('option').text(element).property('value', element);
    });

    let firstSample = platformNames[0];

    donutChart(firstSample);
    // buildCharts(firstSample);
  })
}

main();

// function onlyUnique(value, index, array) {
//   return self.indexOf(value) === index;
// }


function optionChanged(newData) {
  donutChart(newData);
}


function donutChart(platform) {
  d3.json('complete_vertical.json').then((json_data) => {
    // console.log(data);
    // Grab json data
    let data = json_data;
    console.log(data);
    let sampleGenre = [];
    let sampleMovies = [];


    Object.keys(data).forEach((key) => {
      console.log(key, data[key]);


    }
    )

    // let platformArray = data.entries(sampleObj => sampleObj.Platform == platform);
    // console.log('Array ',platformArray)
    // console.log(platformArray)
    // let metaResult = metaArray[0];
    // let panel = d3.select('#sample-metadata');
    // panel.html('');
    // Object.entries(metaResult).forEach(([key, value]) => {
    //   panel.append('h5').text(`${key.toUpperCase()}: ${value}`);
    // })
  })
}
    
    // // Loop through 100
    // for (let i = 0; i <= length(data); i++) {
    //     if (platform == 'Netflix') {
    //     sampleGenre.push(data[i].genre)
    //     sampleMovies.push(data[i].title);
    //   } else if (region == 'Hulu') {
    //     sampleGenre.push(data[i].genre)
    //     sampleMovies.push(data[i].title);
    //   } else if (region == 'Amazon Prime') {
    //     sampleGenre.push(data[i].genre)
    //     sampleMovies.push(data[i].title);
    //   } else {
    //     sampleGenre.push(data[i].genre)
    //     sampleMovies.push(data[i].title);
    //   }
    // }

    // console.log(sampleGenre)
    // console.log(sampleMovies)

// })}
    // Setting Values for pie chart
    // let pieValues = sampleGenre.slice(0, 10)
    // Setting Data points
//     let pieData = [
//       {
//         values: sampleSales,
//         labels: pieValues,
//         type: 'pie',
//         hole: 0.3,
//         textinfo: 'label+percent',
//         textposition: 'outside',
//         marker: {
//           colors: [
//             '#3e2d2e',
//             '#6e4c49',
//             '#94725d',
//             '#bfa17a',
//             '#ddcf95',
//             '#96c083',
//             '#5fa367',
//             '#4a806b',
//             '#3e625e',
//             '#384d52',
//           ],
//         },
//       },
//     ]

//     let pieLayout = {
//       height: 400,
//       width: 550,
//       margin: { t: 90, b: 50, l: 0, r: 0, pad: 2 },
//       title: {
//         text: `Top Played Genres in Region: ${regionName}`,
//       },
//       showlegend: true,
//       plot_bgcolor: 'black',
//       paper_bgcolor: '#0d0d0d',
//       font: {
//         color: 'white',
//         family: 'Roboto, san-serif',
//       },
//     }

//     Plotly.newPlot('pie', pieData, pieLayout)
//   })
// }