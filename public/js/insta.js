var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

//var bodyParser = require('body-parser');

app.get('/api/gram/', function (req, res) {
  console.log('Got it');
  res.jsonp({ res: 'add' });
});

app.listen(port, function () {
  console.log('Server running on port %s', port);
});
