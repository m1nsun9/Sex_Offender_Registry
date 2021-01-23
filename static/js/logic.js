// import chart from 'tui-chart';
// connection to local host
allURL = "http://127.0.0.1:5000/registry";
uniqueURL = "http://127.0.0.1:5000/unique";

d3.json(allURL).then(function(registryData) { 
  d3.json(uniqueURL).then(function(uniqueData) {
    console.log(registryData);
    createAreaChart(uniqueData);
    createMarkers(registryData);
  });
});

function createMarkers(data) {
  // on each individual datapoint, create bindpopup with information
  function onEachMarker(offender) {
    var height_feet = Math.floor(offender.Height_Inches/12);
    var height_inches = offender.Height_Inches - (height_feet * 12);
    return L.marker([offender.Latitude, offender.Longitude])
        .bindPopup(`<h3>NAME: ${offender.First_Name} ${offender.Last_Name}</h3>
        <p>Height: ${height_feet}'${height_inches}</p>
        <p>Hair Color: ${offender.Hair_Color}</p>
        <p>Eye Color: ${offender.Eye_Color}</p>`)
  };

  // see if we can change this method to use L.markerClusterGroup()
  var offenders = [];

  for (var i = 0; i < data.length; i++) {
    offenders.push(onEachMarker(data[i]));
  };

  var offendersLayer = L.layerGroup(offenders);

  createMap(offendersLayer);
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
};

function createAreaChart(uniqueData) {
  var container = document.getElementById('chart');
  var data = {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: []
  };

  // when parsing datetime data, use indexes 12:16
  // object of objects
  var years = {};
  
  for (var i = 0; i < uniqueData.length; i++) {
    var offender = uniqueData[i];

    var year = parseInt(offender.Date_Registered.substring(12, 16));
    var monthIndex = data.categories.indexOf(offender.Date_Registered.substring(8, 11));
    // if year already exists in object, update count for particular month
    if (year in years) {
      years[year].data[monthIndex] += 1;
    }
    else {
      // for each unique year, create a new object
      years[year] = {
        'name': year,
        'data': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      years[year].data[monthIndex] += 1;
    };
  };

  for (const [key, value] of Object.entries(years)) {
    data.series.push(value);
  };

  var options = {
    chart: {
        width: 1160,
        height: 540,
        title: 'Sex Offenders Registered',
        format: '1'
    },
    yAxis: {
        title: 'Monthly Registers',
        max: 40,
        pointOnColumn: true
    },
    xAxis: {
        title: 'Month'
    },
    series: {
        stack: 'normal',
        showDot: false,
        areaOpacity: 1
    },
    tooltip: {
        grouped: true
    }
  };

  var theme = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd',
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd',
            '#83b14e', '#458a3f'
        ]
    }
  };

  console.log(data);

  // tui.chart.areaChart(container, data, options);
};