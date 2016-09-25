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
      "description": "Microsoft was founded by Paul Allen and Bill Gates on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800. It rose to dominate the personal computer operating system market with MS-DOS in the mid-1980s, followed by Microsoft Windows. The company's 1986 initial public offering (IPO), and subsequent rise in its share price, created three billionaires and an estimated 12,000 millionaires among Microsoft employees. Since the 1990s, it has increasingly diversified from the operating system market and has made a number of corporate acquisitions. In May 2011, Microsoft acquired Skype Technologies for $8.5 billion in its largest acquisition up to,[10] June 2016 announced plan to acquire LinkedIn for $26.2 billion",
      "photo" : "microsoft.svg",
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
