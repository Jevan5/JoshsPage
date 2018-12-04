var express = require('express');
var app     = express();
var path    = require('path');
const https = require ('https');
const fs    = require('fs');

// Main page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// Images
app.get('/assets/images/:image', function(req, res) {
    if (req.params.image !== 'me.jpg' && req.params.image !== 'background.jpg') {
        res.error('No such file.');
        return;
    }
    res.sendFile(path.join(__dirname + '/assets/images/' + req.params.image));
});

// CSS
app.get('/css/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/css/style.css'));
});

// Files
app.get('/assets/files/:file', function(req, res) {
    if (req.params.file !== 'Resume_Evans_Joshua.pdf') {
        res.error('No such file.');
        return;
    }
    res.sendFile(path.join(__dirname + '/assets/files/' + req.params.file));
});

const port = 423;
https.createServer({
    key: fs.readFileSync(""),   // Path to private key
    cert: fs.readFileSync("")   // Path to certificate
}, app).listen(port);
console.log('Listening on localhost:' + port);