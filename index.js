const {nextISSTimesForMyLocation } = require(`./iss`);

// fetchMyIP((error,ip) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log('It worked! Returned IP', ip);
// });

// fetchCoordsByIP('69.9.94.219',(error,coords) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log('It worked! Returned coordinates', coords);
// });

// fetchISSFlyOverTimes({ latitude: 'F', longitude: '-123.13000' } ,(error,passTime) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return console.log
//   }
//   console.log('It worked! Returned duration + risetime', passTime);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});