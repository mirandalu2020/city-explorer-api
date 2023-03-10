'use strict';

const axios = require('axios');
//weatherData: <the data to the front end in my response>
//every time when the server processes a request, it's saved to the cache (dataToSend)
//if the user searched for weather, the key is weatherData
let cache = {};

class Forecast {
  constructor(weatherObject) {
    // this.data = weatherObject;
    // this.city_name = weatherObject.city_name;

    this.date = weatherObject.valid_date;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.max_temp} with ${weatherObject.weather.description.toLowerCase()}`;
  }
}



async function getWeather (request, response,next) {

  //http://api.weatherbit.io/v2.0/forecast/daily?lat=47.6038321&lon=-122.330062&key=39cf8e2e9ef54799b2ea72f9bcc79192&days=3
  let cityLat = request.query.lat;
  let cityLong = request.query.lon;
  let key = cityLat +cityLong + 'Data';

  // if the data is already cached and it's yet expired, send the cached data
  //let timeToCache = 1000*60*60*24;
  let timeToTestCache = 1000*20;
  if (cache[key] && Date.now() - cache[key].timestamp < timeToTestCache) {
    console.log('the data is already in the cache');
    response.status(200).send(cache[key]);
  }
  // else if the data isn't already in the cache or not recent enough, request the data from the API
  else{
    console.log('It is not in the cash, make request');
  }
  let config = {
    baseURL: 'http://api.weatherbit.io/v2.0/forecast/daily',
    params: {
      key:process.env.WEATHERBIT_API_KEY,
      lat:cityLat,
      lon:cityLong,
      days: 5,
    },
    method:'get',
  };

  try{
    let weatherData = await axios(config);
    let weatherDataResults = weatherData.data.data.map(item => new Forecast(item));
    cache[key] = weatherDataResults;
    cache[key] = {
      data:weatherDataResults,
      timestamp: Date.now(),
    };
    response.send(weatherDataResults);
  } catch (err){
    Promise.resolve().then(()=> {
      throw new Error(err.message);
    }).catch(next);
  }
}

module.exports = getWeather;
