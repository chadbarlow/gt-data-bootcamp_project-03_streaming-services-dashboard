let lineData;
let lineGenres;

async function main() {
  d3.json('/get_vertical').then((json_data) => {
    // Convert the json_data object to an array
    const dataArray = Object.values(json_data);
    lineData = processLineData(dataArray);
    console.log(`DATA ${lineData}`)
    lineGenres = extractLineGenres(lineData);

    // First, we need to transform the lineData into a more suitable format for Plotly
    const platforms = Array.from(new Set(lineData.map((d) => d.platform)));
    const years = Array.from(new Set(lineData.map((d) => d.year))).sort();

    const traces = platforms.map((platform) => {
      const platformData = lineData.filter((d) => d.platform === platform);
      const countsPerYear = years.map((year) => {
        const yearData = platformData.find((d) => d.year === year);
        return yearData ? yearData.count : 0;
      });

      return {
        x: years,
        y: countsPerYear,
        mode: "lines+markers",
        name: platform,
        marker: {
          size: 6
        },
      };
    });

const layout = {
  xaxis: {
    tickmode: "linear",
    range: [2015, Math.max(...years)],
    dtick: 1,
  },
  yaxis: {
  },
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


    console.log(platforms);
    console.log(years);
    console.log(traces)

    Plotly.newPlot("line", traces, layout);
  });
}

main();

function processLineData(json_data) {
  const parsedData = {};

  json_data.forEach(row => {
    const platform = row['platform'];
    const genre = row['listed_in'];
    const year = moment(row['added']).year();

    if (!parsedData[platform]) {
      parsedData[platform] = {};
    }

    if (!parsedData[platform][genre]) {
      parsedData[platform][genre] = {};
    }

    if (!parsedData[platform][genre][year]) {
      parsedData[platform][genre][year] = 0;
    }

    parsedData[platform][genre][year] += 1;
  });

  const lineData = [];

  for (const platform in parsedData) {
    if (platform !== 'Amazon Prime') { // Add this condition to disregard "Amazon Prime" platform
      for (const genre in parsedData[platform]) {
        for (const year in parsedData[platform][genre]) {
          const yearNum = parseInt(year);
          if (yearNum && yearNum >= 2015) { // Add this condition to filter out years earlier than 2015 and to ensure that yearNum is not null or undefined
            lineData.push({
              platform: platform,
              genre: genre,
              year: yearNum,
              count: parsedData[platform][genre][year]
            });
          }
        }
      }
    }
  }

  return lineData;
}


        
function extractLineGenres(lineData) {
const genreCounts = {};

for (const row of lineData) {
const lineGenres = row.genre.split(', ');
for (const genre of lineGenres) {
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

