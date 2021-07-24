const express   = require('express');
const app       = express();
const path      = require('path');
const http      = require('http');
const https     = require ('https');
const fs        = require('fs');
const key       = '../cert/server.key';
const cert      = '../cert/server.crt';
const httpPort	= 80;
const httpsPort	= 443;

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


https.createServer({
     key: fs.readFileSync(key),   // Path to private key
     cert: fs.readFileSync(cert)   // Path to certificate
}, app).listen(httpsPort, () => {
    console.log(`Listening on ${httpsPort} for HTTPS connections`);
});

http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
}, app).listen(httpPort, () => { 
    console.log(`Listening on ${httpPort} for HTTP connections`);
});

