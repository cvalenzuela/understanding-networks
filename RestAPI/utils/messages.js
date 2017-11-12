/*
ITP Food API

Utils
Messages
*/

const db = require('./../db');

module.exports = {
  subscription : {
    new: `Welcome to the ITP Food Services. You are now subscribed to the service. You will receive notifications each time there's food on the floor. Jummy!`,
    delete: `Sorry to see you go! (We are not really sorry, there's more food for the rest of us!)`
  },
  food: {
    true: `YEEEEES!!! There is food! Run now!`,
    false: `Noooop. What about if you bring something? Ahh? Aren't you so hungry?`,
    announcement: `Yoyoyoyoyoyoyo!!! Someone brought food to the floor. Hurry! Hurry! Hurry!!!`
  }
}