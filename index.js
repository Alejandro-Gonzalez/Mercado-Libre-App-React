var express = require('express');
var app = express();
var path = require('path');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
})
app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
})


var port = process.env.PORT || 3000;

app.listen(port);