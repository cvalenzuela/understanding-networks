// Client
// Handle the socket

import io from 'socket.io-client';

const PORT = ':1122';
let socket;

let urls = document.getElementById('urls');

// Init the socket connection
let init = () => {
  socket = io.connect(PORT, { query: { testquery: '' } });
  socket.on('connect', () => {
    console.log(`Connected to server on port ${PORT}`);
  });
  startEventListeners();
}

// Emitters
let registerUser = username => {
  socket.emit('register', username);
}

// Listeners
let startEventListeners = () => {
  socket.on('updateUrls', data => {
    urls.innerHTML = '';
    for(let url in data.amounts){
      urls.innerHTML += url + ': ' + data.amounts[url] + '<br>';
      console.log(data)
    }
  });
};

export  { init, }