var express = require('express');
var app = express();
var path = require('path')
var fs = require('fs')
var request = require('superagent');

var secrets = './secret-config.json';
var config

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
        "cats",
        "dogs",
        "elephants",
        "toys",
        "entertainment",
        "cooking",
        "living"
    ]);
});

app.get('/teams', function (req, res) {
  res.send([
        "Microsoft",
        "Amazon",
        "Google"
    ]);
});

app.get('/tags/:tagId', function(req, res) {
  res.send([
      {
        "team1": "Microsoft",
        "team2": "Amazon"
      },
      {
        "team1": "Capcom",
        "team2": "Sega"
      },
      {
        "team1": "Batman",
        "team2": "Superman"
      }
    ]);
});

app.get('/teams/:teamId', function(req, res) {
  if (req.params.teamId == "Microsoft") {
    res.send({
      "name": "Microsoft",
      "description": "A technology company",
      "photo" : "",
      "current_amount": 100,
      "total_amount": 1000
    });
  } else {
    res.send("Could not find " + req.params.teamId);
  }
});

app.listen(process.env.PORT || 3000, function() {
    var port = 3000;
    if (process.env.PORT) {
        port = process.env.PORT;
    }
    console.log('Example app listening on port ' + port);
});
