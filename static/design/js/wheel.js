var padding = {top:0, right:20, bottom:0, left:0},
            w = 800 - padding.left - padding.right,
            h = 800 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [];
            var colors = [
                "#9e855c",  // Dark tan brown
                "#385963",  // Dark slate blue
                "#9b4f47", // a deep red-brown color
                "#17262a",  // Dark slate gray
                "#46656f",  // Grayish teal
                "#d3c3b1", // a light beige color
                "#b3c8c3", // a light blue-gray colo
                "#7d9a9a", // a muted teal color
                "#6b5b95", // a purple-blue color
                "#5c5c5c", // a dark gray color
                "#3f4238" // a dark olive-green color
                ];
            var color = d3.scale.ordinal()
            .range(colors);

            var data = [
                    {"label":"Drama",  "value":1}, // padding
                    {"label":"International",  "value":1}, //font-family
                    {"label":"Documentaries",  "value":2}, //color
                    {"label":"Comedies",  "value":3}, //font-weight
                    {"label":"Action & Adventure",  "value":4}, //font-size
                    {"label":"Romance",  "value":5}, //background-color
                    {"label":"Horror & Suspense",  "value":6}, //nesting
                    {"label":"Family",  "value":7}, //bottom
                    
        ];
        // var color = d3.scaleOrdinal()
        //       .range(["#9e855c", "#385963", "#f7f9f5", "#17262a", "#46656f", "#6a8a95", "#a5b7bd", "#c5cfd3", "#c6b9a3", "#ffffff"]);
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        arcs.append("text")
            .attr("transform", function(d){
                    d.innerRadius = 0;
                    d.outerRadius = r - 20;
                    d.angle = (d.startAngle + d.endAngle)/2;
                    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
                })
            .attr("text-anchor", "end")
            .style("fill", "white") // add this line to set the text color
            .text(function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            
            container.on("click", null);
            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            // if(oldpick.indexOf(picked) !== -1){
            //     d3.select(this).call(spin);
            //     return;
            // } else {
            //     oldpick.push(picked);
            // }
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen
                    // d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                    //     .attr("fill", "#111");
                    //populate question
                    // d3.select("#question h1")
                    //     .text(data[picked].question);
                    d3.json("/get_vertical", function(json_data) {
                        // console.log(json_data[0]['Genres']);

                        getRandMovieSuggestion(data[picked].label, json_data);
                    });
                    oldrotation = rotation;
              
                    /* Get the result value from object "data" */
                    // index = picked
                    // value = data[picked].value
                    // console.log(data[picked].value)
              
                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                });
        }
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN!")
            .style({"font-weight":"bold", "font-style":"italic", "font-size":"38px", "letter-spacing":"2px", "cursor":"pointer"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }

        // custom functions
        function getRandMovieSuggestion(genre, json_data)
        {
            netflix_platform = []
            netflix_movie = []
            netflix_description = []

            hulu_platform = []
            hulu_movie = []
            hulu_description = []

            disney_platform = []
            disney_movie = []
            disney_description = []

            prime_platform = []
            prime_movie = []
            prime_description = []

            console.log(genre);
            for (let key in json_data) 
            {
                // do something for each key in the object 
                if(json_data[key]['listed_in']==genre)
                {
                    if (json_data[key]['platform'] == 'Netflix') {
                        netflix_platform.push(json_data[key]['platform']);
                        netflix_movie.push(json_data[key]['title']);
                        netflix_description.push(json_data[key]['description']);
                      } else if (json_data[key]['platform'] == 'Hulu') {
                        hulu_platform.push(json_data[key]['platform']);
                        hulu_movie.push(json_data[key]['title']);
                        hulu_description.push(json_data[key]['description']);
                      } else if (json_data[key]['platform'] == 'Disney Plus'){
                        disney_platform.push(json_data[key]['platform']);
                        disney_movie.push(json_data[key]['title']);
                        disney_description.push(json_data[key]['description']);
                      } else {
                        prime_platform.push(json_data[key]['platform']);
                        prime_movie.push(json_data[key]['title']);
                        prime_description.push(json_data[key]['description']);
                      }              
                }
            }         


            // Returns a random integer from 0 to 9:
            // data.length()
            // Math.floor(Math.random() * Object.keys(json_data).length/2);
            neflix_id = Math.floor(Math.random() * netflix_platform.length);
            hulu_id = Math.floor(Math.random() * hulu_platform.length);
            disney_id = Math.floor(Math.random() * disney_platform.length);
            prime_id = Math.floor(Math.random() * prime_platform.length);

            
            console.log('Total Movies: ', 'Neflix: ', netflix_platform.length, 'Hulu: ', hulu_platform.length, 'Disney Plus: ', disney_platform.length, 'Amazon prime: ', prime_platform.length);
            console.log('Recommendation');

            if(netflix_movie[neflix_id] == undefined) {
                console.log('Not available');
            } else {
                console.log(netflix_movie[neflix_id]);
                console.log(netflix_description[neflix_id]);
                console.log(netflix_platform[neflix_id]);
            };

            if(hulu_movie[hulu_id] == undefined) {
                console.log('Not available');
            } else {
                console.log(hulu_movie[hulu_id]);
                console.log(hulu_description[hulu_id]);
                console.log(hulu_platform[hulu_id]);
            };

            if(disney_movie[disney_id] == undefined) {
                console.log('Not available');
            } else {
                console.log(disney_movie[disney_id]);
                console.log(disney_description[disney_id]);
                console.log(disney_platform[disney_id]);

            };

            if(prime_movie[prime_id] == undefined) {
                console.log('Not available');
            } else {
                console.log(prime_movie[prime_id]);
                console.log(prime_description[prime_id]);
                console.log(prime_platform[prime_id]);
            };

            // Display selection of movies for each platform in corresponding elements on html page 
            if(netflix_movie[neflix_id] == undefined) {
                document.getElementById("p1").innerHTML = '';
                document.getElementById("p2").innerHTML = 'Not Available on Netflix';
                document.getElementById("p3").innerHTML = '';
            } else {
                document.getElementById("p1").innerHTML = String(netflix_platform[neflix_id]);
                document.getElementById("p2").innerHTML = String(netflix_movie[neflix_id]);
                document.getElementById("p3").innerHTML = String(netflix_description[neflix_id]);
            };

            if(hulu_movie[hulu_id] == undefined) {
                document.getElementById("p4").innerHTML = '';
                document.getElementById("p5").innerHTML = 'Not Available on Hulu';
                document.getElementById("p6").innerHTML = '';
            } else {
                document.getElementById("p4").innerHTML = String(hulu_platform[hulu_id]);
                document.getElementById("p5").innerHTML = String(hulu_movie[hulu_id]);
                document.getElementById("p6").innerHTML = String(hulu_description[hulu_id]);
            };

            if(disney_movie[disney_id] == undefined) {
                document.getElementById("p7").innerHTML = '';
                document.getElementById("p8").innerHTML = 'Not Available on Disney+';
                document.getElementById("p9").innerHTML = '';
            } else {
                document.getElementById("p7").innerHTML = String(disney_platform[disney_id]);
                document.getElementById("p8").innerHTML = String(disney_movie[disney_id]);
                document.getElementById("p9").innerHTML = String(disney_description[disney_id]);
            };

            if(prime_movie[prime_id] == undefined) {
                document.getElementById("p10").innerHTML = '';
                document.getElementById("p11").innerHTML = 'Not Available on Amazon prime';
                document.getElementById("p12").innerHTML = '';
            } else {
                document.getElementById("p10").innerHTML = String(prime_platform[prime_id]);
                document.getElementById("p11").innerHTML = String(prime_movie[prime_id]);
                document.getElementById("p12").innerHTML = String(prime_description[prime_id]);     
            };                     
        }

