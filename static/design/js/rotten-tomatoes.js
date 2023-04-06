let data;
let genres;

async function main() {
  d3.json('/get_vertical').then((json_data) => {
    // Convert the json_data object to an array
    const dataArray = Object.values(json_data);
    data = processData(dataArray);
    genres = extractGenres(data);

    // Add checkboxes
    const checkboxContainer = document.getElementById("genreCheckboxes");
    for (const genre of genres) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = genre;
      checkbox.id = genre;
      checkbox.checked = selectedGenres.includes(genre);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedGenres.push(checkbox.value);
        } else {
          selectedGenres = selectedGenres.filter((genre) => genre !== checkbox.value);
        }
        updateChart();
      });
      const label = document.createElement("label");
      label.htmlFor = genre;
      label.textContent = genre;
      const container = document.createElement("div");
      container.appendChild(checkbox);
      container.appendChild(label);
      container.style.display = "inline-block";
      checkboxContainer.appendChild(container);
    }

    updateChart();
  });

  let selectedGenres = ["Drama", "Sports", "Documentaries"];

  let genreColors = [
    "#9e855c", // Dark tan brown
    "#385963", // Dark slate blue
    "#6b5b95", //Light grayish white
    "#17262a", // Dark slate gray
    "#46656f", // Grayish teal
    "#6a8a95", // Grayish blue
    "#a5b7bd", // Light grayish blue
    "#c5cfd3", // Light grayish blue-gray
    "#c6b9a3", // Tan gray
    "#d3c3b1", // a light beige color
    "#b3c8c3", // a light blue-gray color
    "#aa9e8f", // a warm brown-gray color
    "#a5a5a5", // a medium gray color
    "#9b4f47", // a deep red-brown color
    "#8f979d", // a cool gray-blue color
    "#7d9a9a", // a muted teal color
    "#6b5b95", // a purple-blue color
    "#5c5c5c", // a dark gray color
    "#3f4238" // a dark olive-green color
  ];

  function updateChart() {
    const traceData = [];
    for (const genre of selectedGenres) {
      const genreIndex = genres.indexOf(genre);
      const trace = {
        x: [],
        y: [],
        name: genre,
        type: "bar",
        marker: {
          color: genreColors[genreIndex],
        },
      };

      for (const platform in data) {
        trace.x.push(platform);
        trace.y.push(data[platform][genre]);
      }

      traceData.push(trace);
    }

    const layout = {
      xaxis: {
        title: "Platform",
        font: {
          size: 18,
          color: "#1f77b4"
        },
      },
      yaxis: {
        title: "Score",
        font: {
          size: 18,
          color: "#1f77b4"
        },
      },
      barmode: "group",
      legend: {
        title: "Genre",
        font: {
        size: 16,
        color: "#1f77b4"
        },
        },
        margin: {
        t: 30
        },
        legend: {
        title: "",
        font: {
        family: "Fira Sans",
        size: 16,
        color: "#343A3F"
        }
        },
        };
        Plotly.newPlot("rotten-tomatoes", traceData, layout);
      }

      const selectBoxes = document.querySelectorAll("select");
      selectBoxes.forEach(selectBox => {
      selectBox.addEventListener("change", updateChart);
      });
      }
      
      main();
      
      function processData(json_data) {
      const parsedData = {};
      
      json_data.forEach(row => {
      const platform = row['platform'];
      const genre = row['listed_in'];
      const score = parseFloat(row['score']);
      
      if (!parsedData[platform]) {
        parsedData[platform] = {};
      }
      
      if (!parsedData[platform][genre]) {
        parsedData[platform][genre] = {
          sum: 0,
          count: 0
        };
      }
      
      parsedData[platform][genre].sum += score;
      parsedData[platform][genre].count += 1;
    });

    for (const platform in parsedData) {
    for (const genre in parsedData[platform]) {
    parsedData[platform][genre] = parsedData[platform][genre].sum / parsedData[platform][genre].count;
    }
    }
    
    return parsedData;
    }
    
    function extractGenres(data) {
    const genreCounts = {};
    
    for (const platform in data) {
    for (const genre in data[platform]) {
    if (!genreCounts[genre]) {
    genreCounts[genre] = 0;
    }
    genreCounts[genre]++;
    }
    }
    
    const sortedGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([genre]) => genre)
    .slice(0, 10);
    
    return sortedGenres;
    }      