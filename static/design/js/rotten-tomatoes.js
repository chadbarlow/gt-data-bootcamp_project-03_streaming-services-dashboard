const url = ""

const getData = () => {
    const ss_names_ls = ['Disney+  ', 'Netflix  ', 'Prime Video  ', 'Hulu  ']
    const ss_RTratings_ls = ['92', '85', '77', '55']
    const top_films_lsobjs = [
        { "Comedy": "The Princess Bride", "Drama": "The Shawshank Redemption", "Action": "The Dark Knight", "Thriller": "The Silence of the Lambs", "Romance": "Titanic", "Horror": "The Shining", "Crime": "The Godfather", "Adventure": "The Lord of the Rings: The Fellowship of the Ring", "Sci-Fi": "Star Wars: Episode IV - A New Hope", "Fantasy": "The Lord of the Rings: The Return of the King", "Mystery": "Se7en", "Animation": "Spirited Away", "Family": "The Lion King", "Biography": "The Imitation Game", "History": "Schindler's List", "War": "Saving Private Ryan", "Music": "La La Land", "Sport": "Rocky", "Western": "The Good, the Bad and the Ugly", "Musical": "The Sound of Music" },
        { "Comedy": "The Big Lebowski", "Drama": "The Godfather", "Action": "The Dark Knight", "Thriller": "The Silence of the Lambs", "Romance": "Titanic", "Horror": "The Shining", "Crime": "The Godfather", "Adventure": "The Lord of the Rings: The Fellowship of the Ring", "Sci-Fi": "Star Wars: Episode IV - A New Hope", "Fantasy": "The Lord of the Rings: The Return of the King", "Mystery": "Se7en", "Animation": "Spirited Away", "Family": "The Lion King", "Biography": "The Imitation Game", "History": "Schindler's List", "War": "Saving Private Ryan", "Music": "La La Land", "Sport": "Rocky", "Western": "The Good, the Bad and the Ugly", "Musical": "The Sound of Music" },
        { "Comedy": "Wedding Crashers", "Drama": "The Shawshank Redemption", "Action": "The Dark Knight", "Thriller": "The Silence of the Lambs", "Romance": "Titanic", "Horror": "The Shining", "Crime": "The Godfather", "Adventure": "The Lord of the Rings: The Fellowship of the Ring", "Sci-Fi": "Star Wars: Episode IV - A New Hope", "Fantasy": "The Lord of the Rings: The Return of the King", "Mystery": "Se7en", "Animation": "Spirited Away", "Family": "The Lion King", "Biography": "The Imitation Game", "History": "Schindler's List", "War": "Saving Private Ryan", "Music": "La La Land", "Sport": "Rocky", "Western": "The Good, the Bad and the Ugly", "Musical": "The Sound of Music" },
        { "Comedy": "The Hangover", "Drama": "The Shawshank Redemption", "Action": "The Dark Knight", "Thriller": "The Silence of the Lambs", "Romance": "Titanic", "Horror": "The Shining", "Crime": "The Godfather", "Adventure": "The Lord of the Rings: The Fellowship of the Ring", "Sci-Fi": "Star Wars: Episode IV - A New Hope", "Fantasy": "The Lord of the Rings: The Return of the King", "Mystery": "Se7en", "Animation": "Spirited Away", "Family": "The Lion King", "Biography": "The Imitation Game", "History": "Schindler's List", "War": "Saving Private Ryan", "Music": "La La Land", "Sport": "Rocky", "Western": "The Good, the Bad and the Ugly", "Musical": "The Sound of Music" }]
    const top_films_ls = [];
    for (var i = 0; i < top_films_lsobjs.length; i++) {
        const entries = Object.entries(top_films_lsobjs[i]);
        const htmlString = entries.map(([key, value]) => `<br><b>${key}:</b> ${value}`).join(" ");
        top_films_ls.push(htmlString);
    }
    return {

        ss_names_ls,
        ss_RTratings_ls,
        top_films_ls
    };
    console.log(top_films_ls)
};

const createBarChart = ({ ss_names_ls, ss_RTratings_ls, top_films_ls }) => {
    const data = [{
        type: 'bar',
        y: ss_names_ls,
        x: ss_RTratings_ls,
        orientation: 'h',
        text: top_films_ls,
        hovertemplate: '<b>Top Films by Genre:</b><br>%{text}<extra></extra>',
        hoverlabel: { bgcolor: "#FFF" },
        marker: {
            color: ['#FA3200', '#FA3200', '#FA3200', '#00912D'],
        }
    }];
    const layout = {
        // title: '<b>Average Rotten Tomatoes Score</b><br>Across All Content',
        titlefont: {
            size: 20,
            color: '#333333',
            family: 'Oswald, sans-serif'
        },
        xaxis: {
            title: '',
            titlefont: {
                size: 12,
                color: '#333333'
            },
            tickfont: {
                size: 12,
                color: '#333333'
            },
            zerolinecolor: '#4AAAA5',
        },
        yaxis: {
            title: '',
            titlefont: {
                size: 12,
                color: '#333333'
            },
            tickfont: {
                size: 12,
                color: '#333333'
            },
        },
        images: [
            {
                "source": "/static/design/img/png/rotten-tomatoes/certified_critics.png",
                "xref": "x",
                "yref": "y",
                "x": ss_RTratings_ls[0],
                "y": 0.5,
                "sizex": 10,
                "sizey": 10,
                "xanchor": "center",
                "yanchor": "center"
            },
            {
                "source": "/static/design/img/png/rotten-tomatoes/certified_critics.png",
                "xref": "x",
                "yref": "y",
                "x": ss_RTratings_ls[1],
                "y": 1.5,
                "sizex": 10,
                "sizey": 10,
                "xanchor": "center",
                "yanchor": "center"
            },
            {
                "source": "/static/design/img/png/rotten-tomatoes/certified_critics.png",
                "xref": "x",
                "yref": "y",
                "x": ss_RTratings_ls[2],
                "y": 2.5,
                "sizex": 10,
                "sizey": 10,
                "xanchor": "center",
                "yanchor": "center"
            },
            {
                "source": "/static/design/img/png/rotten-tomatoes/rotten_critics.png",
                "xref": "x",
                "yref": "y",
                "x": ss_RTratings_ls[3],
                "y": 3.5,
                "sizex": 10,
                "sizey": 10,
                "xanchor": "center",
                "yanchor": "center"
            }
        ]
    };
    Plotly.newPlot('bar', data, layout);

};

const updateCharts = (allData, selectionName) => {
    const { ss_names_ls, ss_RTratings_ls, top_films_ls } = getData();
    createBarChart({ ss_names_ls, ss_RTratings_ls, top_films_ls });
};

updateCharts();

// const updateCharts = (allData, selectionName) => {
//     const { sampleDataDict, topSampleValues, topOtuIds, topOtuLabels, wfreq, demoDict } = getSelectionData(allData, selectionName);
//     updateDemographics(demoDict);
//     createBarChart({ topSampleValues, topOtuIds, topOtuLabels });
//     createBubbleChart(sampleDataDict);
//     createGaugeChart(wfreq);
// };

// d3.json(url).then(allData => {
//     createDropdown(allData);
//     updateCharts(allData, "940"); //initialize charts with first selection
//     d3.selectAll("#selDataset").on("change", () => {
//         const selectionName = d3.event.target.value;
//         updateCharts(allData, selectionName);
//     });
// }).catch(function (error) {
//     console.log(error);
// });
