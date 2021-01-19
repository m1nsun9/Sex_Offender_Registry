// connection to local host
url = "http://127.0.0.1:5000/"

d3.json(url).then(function(data) { 
  console.log(data)
});