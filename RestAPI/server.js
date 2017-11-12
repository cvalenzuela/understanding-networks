/*
ITP Food API

Server
*/

const http = require('http');
const express = require('express');
const routes = require('./routes');
let router = express.Router();
let bodyParser = require('body-parser');

const app = express()
const PORT = 9888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);
app.use(express.static('public'));

http.createServer(app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})