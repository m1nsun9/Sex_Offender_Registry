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
  var container = document.getElementById('area-chart');
  var data = {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };
  // categories: [Months]
  // series: [{
  // name: Year,
  // data: [number of added offenders per each month]
  // }]

  // when parsing datetime data, use indexes 12:16
  // object of objects
  var years = {};
  
  for (var i = 0; i < uniqueData.length; i++) {
    var offender = uniqueData[i];

    var year = parseInt(offender.Date_Registered.substring(12, 16));
    var monthIndex = data.categories.indexOf(offender.Date_Registered.substring(8, 11));
    console.log(year);
    // if year already exists in object, update count for particular month
    // if (year in years) {
    //   years.year.data[monthIndex] += 1;
    // }
    // else {
    //   // for each unique year, create a new object
    //   years.year = {
    //     'name': year,
    //     'data': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //   };
    //   years.year.data[monthIndex] += 1;
    // };
  };

  // data.series = years;
  // console.log(data);
  console.log(years);

  var options = {

  };
}