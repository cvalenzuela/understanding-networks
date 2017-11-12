/*
ITP Food API

Routes
*/

const express = require('express');
let router = express.Router();
const Controllers = require('./controllers/index');
const multer = require('multer');


// Home
router.get('/', Controllers.Home);

// Subscription
router.post('/subscription', Controllers.Subscription);

// Change food status
router.post('/food', multer({ dest: './uploads/'}).single('image'), Controllers.Food)

module.exports = router;