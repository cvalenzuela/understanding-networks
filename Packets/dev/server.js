/*
Server
*/

import * as fs from 'fs';
import express from 'express';
import https from 'https';
import http from 'http';
import path from 'path';
import socket from 'socket.io';
import { handleSocket } from './handleSocket';
import { startSniffinig, readLogsFile } from './tshark';

const app = express();
let server, host, io;
const PORT = process.env.PORT || 1122;

host = 'http://localhost:'
server = http.Server(app);

io = socket(server);

// tshark arguments
let arg = ["-i", "en0", "-f", "src port 53", "-n", "-T", "fields", "-e", "dns.qry.name", "-w", "data/log3.pcap"]

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  handleSocket(io, socket);
  startSniffinig(arg);
  setInterval(() => {
    console.log('Updating results');
    readLogsFile();
  }, 5000)
});

server.listen(PORT, () => {
  console.log(`Server running at ${host}${PORT}`);

});