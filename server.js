var express = require('express');
var app = express();
var path = require('path')
var fs = require('fs')
var request = require('superagent');
var secrets = './secret-config.json';
var config;
var companies = require('./companies.json');


try {
    config = require(secrets);
}
catch (err) {
    config = {}
    console.log("Unable to read file '" + secrets + "': ", err);
    console.log("See secret-config-sample.json for an example");
}

console.log("API key is:", config.apiKey);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/photo', express.static(__dirname + '/Bootstrap/resources'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/pages', express.static(__dirname + '/pages'));

app.get('/customers', function (req, res) {
  request.get('http://api.reimaginebanking.com/customers?key=' + config.apiKey).end(function(err, response) {
    if (err) {
      console.error("retrieving customers went wrong", err);
    } else {
      res.send(response.body);
    }
  });
});

app.get('/tags', function (req, res) {
  res.send([
        "Social Media"
    ]);
});

app.get('/teams', function (req, res) {
  res.send(companies);
});

app.get('/tags/:tagId', function(req, res) {
  res.send([
      {
        "team1": "Warner Brothers",
        "team2": "Electronic Arts"
      }
    ]);
});

app.get('/teams/:teamId', function(req, res) {
  for (var i = 0; i < companies.length; i++) {
    if (req.params.teamId == companies[i].name) {
      res.send(companies[i]);
      return;
    }
  }
  res.send("Could not find " + req.params.teamId);
});

app.get('/money/:teamId', function(req, res) {
  request.get("http://api.reimaginebanking.com/accounts/{}?key={}".format(req.params.teamId,config.apiKey) ).end(function(err, response) {
    if (err) {
      console.error("Retrieving bank info gone wrong", err);
    } else {
      res.send(response.body);
    }
  });
});

app.get('/transfer/:fromId/company/:toId', function(req, res) {
  request.get("http://api.reimaginebanking.com/accounts/{}?key={}".format(req.params.teamId,config.apiKey) ).end(function(err, response) {
    if (err) {
      console.error("Retrieving bank info gone wrong", err);
    } else {
      res.send(response.body);
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
    var port = 3000;
    if (process.env.PORT) {
        port = process.env.PORT;
    }
    console.log('Example app listening on port ' + port);
});
