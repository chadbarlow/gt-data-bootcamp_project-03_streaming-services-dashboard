function main() {
  let selector = d3.select('#selDataset');
  platformNames = ['Netflix', 'Hulu', 'Disney Plus', 'Amazon Plus'];
  d3.json('complete_vertical.json').then((data) => {
    console.log(data[0].added.substring(0,4));    
    platformNames.forEach(element => {
      selector.append('option').text(element).property('value', element);

    });

    let firstSample = platformNames[0];

    buildCharts(firstSample);
  })
}

main();

// function onlyUnique(value, index, array) {
//   return self.indexOf(value) === index;
// }
///////////////
// var graph_dict= {};
// graph_dict['2000'] = {a:0,b:0,c:0};
// console.log('2000' in graph_dict);
// if('2000' in graph_dict)
// {
//   graph_dict['2000'].a += 1;
// }
// else
// {
//   graph_dict['2000'] = {a:0,b:0,c:0};
// }
// console.log(graph_dict)
///////////////

// change dropdown option and populate selected plots with relevant data
function optionChanged(newData) {
  buildCharts(newData);
}

// 
let filters= {};
let topFive = ['Drama', 'Comedies', 'International', 'Action & Adventure', 'Horror & Suspense'];
let graph_dict= {};

function buildCharts(platform) {
  d3.json('complete_vertical.json').then((json_data) => {
    Object.keys(json_data).forEach((key) => {
          if(json_data[key].platform == platform && topFive.includes(json_data[key].listed_in))
          {
            filters[key] = json_data[key];
          }})
          // fill up graph_dict for relevant data
          Object.keys(filters).forEach((key) => {
            // get the year
            let year = filters[key].added.substring(0,4);
            if(parseInt(year)>2015)
            {
              if(!(year in graph_dict))
              {
                graph_dict[year] = {drama:0,comedy:0,international:0,action_adventure:0,horror_suspense:0};
              }
              if(filters[key].listed_in == 'Drama')
              {
                graph_dict[year].drama += 1;
              }
              else if(filters[key].listed_in == 'Comedies')
              {
                graph_dict[year].comedy += 1;
              }
              else if(filters[key].listed_in == 'International')
              {
                graph_dict[year].international += 1;
              }
              else if(filters[key].listed_in == 'Action & Adventure')
              {
                graph_dict[year].action_adventure += 1;
              }
              else if(filters[key].listed_in == 'Horror & Suspense')
              {
                graph_dict[year].horror_suspense += 1;
              }
            }
          })
          // split graph_dict in their array for plotting
          let year = [];
          let drama = [];
          let comedy = [];
          let international = [];
          let action_adventure = [];
          let horror_suspense = [];
          Object.keys(graph_dict).forEach((key) => {
            year.push(key);
            drama.push(graph_dict[key].drama);
            comedy.push(graph_dict[key].comedy);
            international.push(graph_dict[key].international);
            action_adventure.push(graph_dict[key].action_adventure);
            horror_suspense.push(graph_dict[key].horror_suspense);
          })
          console.log(graph_dict);
          // console.log(year);
          // console.log(drama);
          // console.log(comedy);
          // console.log(international);
          // console.log(action_adventure);
          // console.log(horror_suspense);

          var trace1 = {
            x: year,
            y: drama,
            name: 'Drama',
            type: 'bar'
          };
          
          var trace2 = {
            x: year,
            y: comedy,
            name: 'Comedy',
            type: 'bar'
          };
          
          var trace3 = {
            x: year,
            y: international,
            name: 'International',
            type: 'bar'
          };
          
          var trace4 = {
            x: year,
            y: action_adventure,
            name: 'Action $ Adventure',
            type: 'bar'
          };
          
          var trace5 = {
            x: year,
            y: horror_suspense,
            name: 'Horror $ Suspense',
            type: 'bar'
          };
          

          var data = [trace1, trace2, trace3, trace4, trace5];
          
          var layout = {barmode: 'stack'};
          
          Plotly.newPlot('bar', data, layout);

          
        

        
  } 
  
  
  )};




































// function worldCloud(platform) {
//   d3.json('complete_vertical.json').then((json_data) => {
//     // Grab json data
//     let data = json_data;
//     // console.log(data);
//     let words = [];

//     Object.keys(data).forEach((key) => {
//       platformArray = data[key]['platform'] == 'Netflix'
//     words.push(data[key]['description'].split(' '));
//     console.log(words);
//   })

// })}

