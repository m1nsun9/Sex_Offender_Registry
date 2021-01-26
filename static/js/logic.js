// connection to local host
allURL = "http://127.0.0.1:5000/registry";
uniqueURL = "http://127.0.0.1:5000/unique";

var myMap, myAreaChart, myBarChart;

d3.json(allURL).then(function(registryData) { 
  d3.json(uniqueURL).then(function(uniqueData) {
    console.log(registryData);
    myMap = createMarkers(registryData);
    myAreaChart = createAreaChart(uniqueData);
    myBarChart = createBarChart(uniqueData);

  });
});

// run event listener
var filterButton = d3.select("#filter-btn");
var form = d3.select("form");

filterButton.on("click", runFilter);
form.on("change", runFilter);

function createMarkers(data) {
  var markers = L.markerClusterGroup();

  for (var i = 0; i < data.length; i++) {

    var offender = data[i];
    var location = [offender.Latitude, offender.Longitude];
    var height_feet = Math.floor(offender.Height_Inches/12);
    var height_inches = offender.Height_Inches - (height_feet * 12);

    // on each individual datapoint, create bindpopup with information
    if (location) {
      markers.addLayer(L.marker(location)
          .bindPopup(`<h3>Name: ${offender.First_Name} ${offender.Last_Name}</h3>
          <p>Height: ${height_feet}'${height_inches}</p>
          <p>Hair Color: ${offender.Hair_Color}</p>
          <p>Eye Color: ${offender.Eye_Color}</p>`))
    };
  };

  var myMap = createMap(markers);
  return myMap;
};

function createMap(offendersLayer) {
  // Adding tile layer to the map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    "Sex Offenders": offendersLayer
  };

  var myMap = L.map("map", {
    center: [
      38.9072, -77.0369
    ],
    zoom: 11,
    layers: [darkmap, offendersLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  return myMap;
};

function createAreaChart(uniqueData) {
  var ctx = document.getElementById('myAreaChart').getContext('2d');
  var data = {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: []
    }
  };

  // when parsing datetime data, use indexes 12:16
  // object of objects
  var years = {};

  // create a list of colors to pull from randomly for each line
  var randomColors = [
    "#86a075", "#f4561a", "#f43115", "#96d7d3", "#c48fcd", "#ac98a3",
    "#6733ef", "#2b7ea7", "#5a880a", "#e8abe1", "#db760b", "#809ccf",
    "#96d33b", "#76d1db", "#f7839c", "#725cd2", "#d3b35f", "#024482",
    "#38c244", "#9d01a6", "#f0ff66", "#f809d8"];

  // loop through each datapoint and add a new object for previously unrecorded years
  // and add tallies to dates registered for ones that have been recorded
  for (var i = 0; i < uniqueData.length; i++) {
    var offender = uniqueData[i];

    var year = parseInt(offender.Date_Registered.substring(12, 16));
    var monthIndex = data.data.labels.indexOf(offender.Date_Registered.substring(8, 11));

    // if year already exists in object, update count for particular month
    if (year in years) {
      years[year].data[monthIndex] += 1;
    }
    else {
      var randomColorIndex = Math.floor(Math.random() * randomColors.length);
      // for each unique year, create a new object
      years[year] = {
        'label': `${year}`,
        'data': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'fill': true,
        'borderColor': randomColors[randomColorIndex],
        'borderWidth': 1,
        'hoverBackgroundColor': "rgba(214, 214, 214, 0.712)"
      };

      // start tally for month
      years[year].data[monthIndex] += 1;
      // drop used color from list
      randomColors = randomColors.filter(color => color !== randomColors[randomColorIndex]);
    };
  };

  // push each year object to the dataset list
  for (const [key, value] of Object.entries(years)) {
    data.data.datasets.push(value);
  };

  // add options object for styling
  data["options"] = {
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "rgba(214, 214, 214, 0.712)"
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: "rgba(214, 214, 214, 0.712)"
        }
      }]
    },
    legend: {
      display: true,
      position: 'left',
      labels: {
        fontColor: "rgba(214, 214, 214, 0.712)",
        fontSize: 10
      },
    },
    tooltips: {
      mode: "x",
      displayColors: true,
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return {
            borderColor: data.data.datasets[tooltipItem.datasetIndex].borderColor,
            backgroundColor: data.data.datasets[tooltipItem.datasetIndex].borderColor
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  // initialize chart
  var myChart = new Chart(ctx, data);

  return myChart;
};

function createBarChart(uniqueData) {
  var ctx = document.getElementById("myBarChart");
  var data = {
    labels: ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7"],
    datasets: []
  };

  var classifications = {};
  var randomColors = [
    "#f82386", "#5e62c5"];

  // separated by districts and classification 
  for (var i = 0; i < uniqueData.length; i++) {
    var offender = uniqueData[i];
    
    var district = `District ${offender.District}`;
    var maxClassification = offender.Max_Classification;
    var classIndex = data.labels.indexOf(district);

    if (maxClassification in classifications) {
      classifications[maxClassification].data[classIndex] += 1;
    }
    else {
      var randomColorIndex = Math.floor(Math.random() * randomColors.length);
      classifications[maxClassification] = {
        label: maxClassification,
        backgroundColor: randomColors[randomColorIndex],
        data: [0, 0, 0, 0, 0, 0, 0]
      };

      // start tally for offender's district
      classifications[maxClassification].data[classIndex] += 1;
      // drop used color from list
      randomColors = randomColors.filter(color => color !== randomColors[randomColorIndex]);
    };
  };

  // push each year object to the dataset list
  for (const [key, value] of Object.entries(classifications)) {
    data.datasets.push(value);
  };

  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      tooltips: {
        mode: 'x',
        displayColors: true,
        callbacks:{
          mode: 'x',
        },
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "rgba(214, 214, 214, 0.712)"
          }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
            fontColor: "rgba(214, 214, 214, 0.712)"
          },
          type: 'linear'
        }]
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: { 
        position: 'right',
        labels: {
          fontColor: "rgba(214, 214, 214, 0.712)",
          fontSize: 10
        },
      },
    }
  });

  return myChart;
};

// create a filter function
function runFilter() {

  var zipInputField = d3.select("#zipcode");
  var zipInputValue = zipInputField.property("value");

  console.log(zipInputValue);


  // prevent page from refreshing
  // d3.event.preventDefault();
  d3.json(allURL).then(function(registryData) { 
    d3.json(uniqueURL).then(function(uniqueData) {
    
      var filteredMapData = registryData.filter(offender => offender.ZIP_Code === zipInputValue);
      var filteredChartData = uniqueData.filter(offender => offender.ZIP_Code === zipInputValue);
    
      if (filteredMapData && filteredChartData) {
        // remove existing map data
        myMap.remove();
        myMap = null;

        // remove existing area chart data
        myAreaChart.destroy();
        // console.log(myAreaChart)
        myBarChart.destroy();
      };

      // redraw map with new markers
      myMap = createMarkers(filteredMapData);
      // redraw area chart and bar chart with filtered data
      myAreaChart = createAreaChart(filteredChartData);
      myBarChart = createBarChart(filteredChartData);
    });
  });

};
