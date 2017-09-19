/*
Traceroute the browser history 
*/

const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const colors = require('colors');
const geoip = require('geoip-lite');
const spawn = require('child_process').spawn;
const getBrowserHistory = require('./historyQuery');
const createVisualization = require('./../createVis/index');

let timeOut = 30; // seg

module.exports = (startDate, endDate) => {

  getBrowserHistory((browserHistory) => {
    let routes = {};
    let queu = [];

    mkdirp('./public/', (err) => {
      err ? console.error(String(err).red) : console.log('-- ./public directory created'.green);
    });

    console.log('-- Starting traceroute with browser history...'.yellow);
    let tracerouteURL = (url) => {
      routes[url] = {
        times: 1,
        hops: []
      }

      let finished = false;
      let traceroute = spawn('traceroute', ['-I', url]);

      try {
        traceroute.stdout.on('data', (data) => {
          let hop = data.toString()
          let ip = hop.substring(hop.lastIndexOf("(") + 1, hop.lastIndexOf(")"));
          ip.length > 0 && routes[url].hops.push([ip, null, null]);
        });
        traceroute.stderr.on('data', (data) => {
          console.log(('-- ' + data.toString()).grey);
        });
        traceroute.on('exit', (code) => {
          if (!finished) {
            console.log(('-- ' + url + ' traceroute finished.').green);

            console.log(('-- Searching for ' + url + ' hops geoposition...').yellow);
            routes[url].hops.forEach((hop) => {
              let ipGeoPosition = geoip.lookup(hop[0]);
              if (ipGeoPosition) {
                hop[1] = ipGeoPosition.ll[0],
                  hop[2] = ipGeoPosition.ll[1]
              }
            });
            console.log(('-- ' + url + ' hops geoposition finished').green);

            fs.writeFile("./public/routes.json", JSON.stringify(routes), (err) => {
              if (err) {
                console.log(String(err).red);
              } else {
                console.log(`-- routes.json updated`.green);
                queu.splice(queu.indexOf(url), 1);
                queu.length == 0 && createVisualization();
              }
            });
            finished = true;
          }
        });

      } catch (error) {
        console.log(('-- An error ocurred ' + error).red);
      }

      setTimeout(() => {
        if (!finished) {
          console.log(('-- Timeout for ' + url).magenta);
          finished = true;
          traceroute.kill();
          queu.splice(queu.indexOf(url), 1);
          queu.length == 0 && createVisualization();
        }
      }, timeOut * 1000);
    }

    // Debug purpuses.
    let testUrls = browserHistory.filter((e, i) => {
      if (i < 1000000) {
        return e
      }
    });
    browserHistory = testUrls;
    // Finish debug

    // Traceroute each url
    let removeHttp = new RegExp('https?://', 'i');

    let checkDates = (date) => {
      if (startDate && endDate) {
        let dateFrom = startDate.split("-");
        let dateTo = endDate.split("-");
        let dateCheck = date.split("-");

        let fromDate = new Date(dateFrom[0], parseInt(dateFrom[1]) - 1, dateFrom[2]); // -1 because months are from 0 to 11
        let toDate = new Date(dateTo[0], parseInt(dateTo[1]) - 1, dateTo[2]);
        let checkDate = new Date(dateCheck[0], parseInt(dateCheck[1]) - 1, dateCheck[2]);

        return checkDate > fromDate && checkDate < toDate
      } else {
        return true;
      }
    }

    browserHistory.forEach((element, index) => {

      let url = element.url.replace(removeHttp, '').split('/')[0];
      let time = element.time.split(' ')[0];

      if (routes[url]) {
        console.log(('-- ' + url + ' already tracerouted.').blue);
        routes[url].times = routes[url].times + 1;
      }
      if (!routes[url] && checkDates(time)) {
        queu.push(url);
        tracerouteURL(url);
      }

    })
  })
}