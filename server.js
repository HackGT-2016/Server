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


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
