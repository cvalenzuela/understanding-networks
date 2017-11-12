/*
ITP Food API

Controllers
GET
url/api/
*/

const db = require('./../db');
const JSONresponses = require('./../utils/jsonResponse');
const messages = require('./../utils/messages');

module.exports = ((req, res) => {
  let msg;
  db.foodStatus ? msg = messages.food.true : msg = messages.food.false;
  JSONresponses.ok(res, db.foodStatus, msg);
})