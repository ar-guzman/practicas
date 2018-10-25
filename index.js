var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
