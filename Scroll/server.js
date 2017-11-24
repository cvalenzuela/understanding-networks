/*
	Express.js REST parameters example
	Shows how to take values in a RESTful way
	in Express.js 4.0
	This does no checking on the data sent, it just takes
	the values in and adds them to arrays.

  based on code by Tom Igoe
	created 12 Nov 2017
  modified 21 Nov 2017
*/
// include libraries and declare global variables:
var express = require('express');	// include the express library
//var https = require('https');     // require the HTTPS library
var http = require('http');       // require the HTTP library
var fs = require('fs');           // require the filesystem library
var app = express();					  // create a server using express
var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data


/// https stuff
// app.use('*', httpRedirect);              // set a redirect function for http
// app.use('/',express.static('public'));   // set a static file directory

// bodyParser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(urlencodedParser);

//Cross-origin stuff for API just in case
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// API data (final structure)
var physdata = {
  "state": true,
  "speed": 10,
  "direction": 'up'
};

// when we get data from the physical controller
app.post('/submit', function (req, res) {
  console.log('someone is here');
  console.log(req.body);
  physdata.state = req.body.state;
  physdata.speed = req.body.speed;
  physdata.direction = req.body.direction;
  res.json(physdata);
});

//this route can serve all the data
app.get('/', function(req, res) {

  // send json
  res.json({"api_status": "ok",
            "data": {
              "state": physdata.state,
              "speed": physdata.speed,
              "direction": physdata.direction
            }
          });

  // console.log("Got a request for /");
});

app.get('/api_status', function(req, res) {
  res.json({"api_status": "ok"});
});

app.get('/state', function(req, res) {
  res.json({"state": physdata.state});
});

app.get('/speed', function(req, res) {
  res.json({"speed": physdata.speed});
});

app.get('/direction', function(req, res) {
  res.json({"direction": physdata.direction});
});

// replace with https
console.log("Server is running on port 1990");
// function httpRedirect(request,response, next) {
//   if (!request.secure) {
//     console.log("redirecting http request to https");
//     response.redirect('https://' + request.hostname + request.url);
//   } else {
//     next();     // pass the request on to the express.static middleware
//   }
// }

// start the server:
http.createServer(app).listen(1990);           // listen for HTTP
//https.createServer(options, app).listen(443);  // listen for HTTPS
