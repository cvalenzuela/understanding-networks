// Server: Handle the Socket 

let socket;

let handleSocket = (io, _socket) => {
  socket = _socket;

  // Client connects
  (() => {
    console.log('cliend connected');
  })();

  // Client Disconnects
  socket.on('disconnect', () => {
    console.log('cliend disconnected');
  });

  // Listeners
  socket.on('register', username => {
    checkIfUserIsRegistered(username);
  });
};

// Update Urls
let updateUrls = data => {
 socket.emit('updateUrls', data);
};

export { handleSocket, updateUrls };