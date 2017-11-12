// tshark proccess

import fs from 'fs-extra';
import colors from 'colors';
const spawn = require('child_process').spawn;
const { exec } = require('child_process');
import { updateUrls } from './handleSocket';

let re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g


// Start sniffing
let startSniffinig = arg => {
  let tshark = spawn('tshark', arg, {
    stdio: "inherit",
  });
}

// Read a logs file
let readLogsFile = () => {
  let tshark = spawn('tshark', ['-r', 'data/log3.pcap'], {});
  console.log('data is: ')
  tshark.stdout.on('data', data => {
    let urls = new Set();
    let amounts = {};
    let results = `${data}`.split(" ");
    results.forEach((element) => {
      if (element.match(re)) {
        if (urls.has(element)) {
          amounts[element]++;
        } else {
          urls.add(element);
          amounts[element] = 0;
        }
      }
    });
    updateUrls({
      urls: urls,
      amounts: amounts
    })
  });
  tshark.stderr.on('data', data => {
    console.log(('-- ' + data.toString()).blue);
  });
  tshark.on('exit', code => {
    console.log(('-- tshark finished.').green);
  });
};


export { startSniffinig, readLogsFile }