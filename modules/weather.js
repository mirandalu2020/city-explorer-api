'use strict';

const axios = require('axios');

class Forecast {
  constructor(weatherObject) {
    // this.data = weatherObject;
    //this.city_name = weatherObject.city_name;
    this.date = weatherObject.valid_date;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.max_temp} with ${weatherObject.weather.description.toLowerCase()}`;
  }
}



async function getWeather (request, response,next) {

  //http://api.weatherbit.io/v2.0/forecast/daily?lat=47.6038321&lon=-122.330062&key=39cf8e2e9ef54799b2ea72f9bcc79192&days=3
  let cityLat = request.query.lat;
  let cityLong = request.query.lon;

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
    let weatherDataResults = await axios(config);
    let sendWeatherData = weatherDataResults.data.data.map(item => new Forecast(item));
    console.log(sendWeatherData);
    // response.send(sendWeatherData);
  } catch (err){
    Promise.resolve().then(()=> {
      throw new Error(err.message);
    }).catch(next);
  }
}

module.exports = getWeather;
