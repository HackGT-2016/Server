var express = require('express');
var app = express();
var path = require('path')

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/pages', express.static(__dirname + '/pages'));

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

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
