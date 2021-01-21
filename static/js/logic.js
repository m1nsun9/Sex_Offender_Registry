// connection to local host
allURL = "http://127.0.0.1:5000/registry";
uniqueURL = "http://127.0.0.1:5000/unique";

d3.json(allURL).then(function(registryData) { 
  // d3.json(uniqueURL).then(function(uniqueData) {
    console.log(registryData);
    createMarkers(registryData);
  // });
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
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
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
    layers: [streetmap, offendersLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};