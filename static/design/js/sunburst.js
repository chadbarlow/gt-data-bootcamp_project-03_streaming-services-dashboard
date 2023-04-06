anychart.onDocumentReady(function () {
  // Fetch JSON data using the fetch API
  fetch('/get_sunburst')
    .then((response) => response.json())
    .then((json_data) => {
      // Create the tree map chart
      const chart = anychart.sunburst(json_data, "as-tree"); // Changed to sunburst chart
      chart.calculationMode("parent-independent");
      var firstLevelColors = [
        // "#95a5a6", // Concrete (Grey)
        // "#34495e", // Wet Asphalt (Dark Blue Grey)
        // "#7f8c8d", // Asbestos (Dark Grey)
        // "#bdc3c7", // Silver (Light Grey)
        "#c6b9a3", // a light blue-gray color
        "#aa9e8f", // a warm brown-gray color
        "#5c5c5c", // a medium gray color
        "#9b4f47", // a deep red-brown color
      ];
      // Create a custom palette
      var customPalette = anychart.palettes.distinctColors().items(firstLevelColors);
      chart.palette(customPalette);


      chart
        .leaves()
        .labels()
        .format(function () {
          var label = this.name;
          var value = this.value;
          return `${label} \n ${value}`;
        });
              // Set fill color based on depth level and index
      chart.fill(function () {
        if (this.level === 0) {
          return "#fff"; // Root node color
        } else if (this.level === 1) {
          return this.mainColor; // First level color from palette
        } else {
          return this.parentColor; // Second level color same as parent
        }
      });
      chart.listen("pointClick", function (event) {
        console.log("listener");
        var point = event.point;
        var films = point.get("films");
        if (films) {
          const cardText = card.querySelector(".card-text");
          cardText.innerHTML = films.join("<br>");
          card.style.display = "block";
        } else {
          chart.tooltip().title(true);
          chart.tooltip().format("{%name}");
          card.style.display = "none";
        }
      });
        // Add event listener to hide tooltip on document click
      document.addEventListener("click", function (event) {
        if (!event.target.closest("#sunburst-child-container")) {
        card.style.display = "none";
        }
      });
      const tooltipContainer =
        document.getElementById("tooltip-container");
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = "Films";
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardBody);
      tooltipContainer.appendChild(card);
      chart.radius("49%");
      var margin = chart.margin();
      margin.set(20, 0, 0, 0);
      var padding = chart.padding();
      padding.set(0, 0, 0, 0);
      chart.container("sunburst-child-container");
      chart.draw();
      setTimeout(function() {
        var watermark = document.querySelector('.anychart-credits');
        if (watermark) {
          watermark.remove();
        }
      }, 100);
      }) // Removed extra closing brace
    .catch((error) => {
      console.error('Error fetching JSON data:', error);
    });
});
