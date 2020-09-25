const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error,null);
    } else {
      const data = JSON.parse(body);
      const addressIP = data.ip;
      callback(null, addressIP);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip,callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error,null);
    } else {
      const locationData = JSON.parse(body);
      const latLon = {latitude: locationData["data"].latitude, longitude: locationData["data"].longitude};
      callback(null, latLon);
    }
    if (response.statusCode !== 200) {
      const msg = `It didn't work! Error: Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchISSFlyOverTimes = function(coords,callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error,null);
    } else {
      const responseInfo = JSON.parse(body).response;
      callback(null, responseInfo);
    }
    if (response.statusCode !== 200) {
      const msg = `It didn't work! Error: Status Code ${response.statusCode} when fetching duration and risetime. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP('69.9.94.219', (error, coords) => {
      if (error) {
        return callback(error, null);;
      }

      fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, nextPasses) => {
        if (error) {
          return callback(error, null);;
        }
        callback(null, nextPasses);
      });

    });

  });

};

module.exports = {nextISSTimesForMyLocation};

