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
        "living",
        "kevin's gay"
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
  res.send({
    "matchups" : [
      {
        "team1": {
          "name": "Microsoft",
          "description": "A technology company",
          "photo" : "",
          "current_amount": 100,
          "total_amount": 1000
        },
        "team2": {
          "name": "Amazon",
          "description": "A super technology company",
          "photo" : "",
          "current_amount": 200,
          "total_amount": 2000
        }
      }
    ]
  })
});

app.get('/teams/:teamId', function(req, res) {
  if (req.params.teamId == "Microsoft") {
    res.send("Hello World!");
  } else {
    res.send("Could not find " + req.params.teamId);
  }
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
