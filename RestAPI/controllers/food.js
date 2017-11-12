/*
ITP Food API

Controllers
POST
url/api/food
*/

const twilio = require('twilio');
const express = require('express');
const db = require('./../db');
const path = require('path');
const messages = require('./../utils/messages');
const secret = require('./../credentials');
const twilioClient = new twilio(secret.SID, secret.TOKEN);

module.exports = (req, res) =>  {

  let img = req.file;

  console.log(img);

  db.foodStatus = !db.foodStatus;
  let response = {
    message: 'Thanks for updating the food status at itp!',
    foodStatus: db.foodStatus
  }

  db.foodStatus && db.subscribers.forEach(number => {
    twilioClient.messages.create({
      body: messages.food.announcement,
      mediaUrl: 'http://165.227.188.111:9888/uploads/hotdog.jpg',
      to: number, 
      from: secret.NUMBER
    })
    .then((message) => console.log(message.sid));
  });

  res.json(response)
}