const PATH_PROJECT = '/dist/easygive-angular';
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + PATH_PROJECT));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, PATH_PROJECT, index.html)));

server.listen(process.env.PORT || 8081, () => {
  if (!process.env.PORT) {
    console.log('Running with Express... http://localhost:8081/');
  }
});
