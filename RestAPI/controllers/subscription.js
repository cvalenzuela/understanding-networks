/*
ITP Food API

Controllers
POST
url/api/subscription
*(Only twilio posts to this route!)
*/

const db = require('./../db');
const messages = require('./../utils/messages');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = (req, res) =>  {
  const twiml = new MessagingResponse();
  const texter = req.body;
  let msg = 'test msg';

  if (texter.Body.indexOf('nsubscribe') > 0) {
    if (db.subscribers.has(texter.From)) {
      db.subscribers.delete(texter.From);
      msg = messages.subscription.delete;
    }
  } else if (texter.Body.indexOf('ubscribe') > 0) {
    if (!db.subscribers.has(texter.From)) {
      console.log('adding user to db', texter.From)
      db.subscribers.add(texter.From);
      msg = messages.subscription.new;
    }
  } else if (texter.Body.indexOf('ood') > 0) {
    db.foodStatus ? msg = messages.food.true : msg = messages.food.false;
  } 

  twiml.message(msg);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}