/*
Rest API
 
Understanding Networks
*/

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
  console.log("New message received");
  const twiml = new MessagingResponse();

  twiml.message('Forks = 0');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
  console.log('response send')
});

// Create Server
http.createServer(app).listen(1338, () => {
  console.log("Express server listening on port 1338");
});

