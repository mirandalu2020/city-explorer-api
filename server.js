'use strict';

console.log('Our first server in Code Fellows');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const data = require('./data/weather.json');
const { response } = require('express');

// must use express
const app = express();
app.use(cors());

//define a port and validate env is working
const PORT = process.env.PORT || 3002;

//the first arugment is a URL in quote
//the second argument is the callback that defines waht should happen when a request comes into the url
app.get('/', (request, response) => {
  response.send('hello from the server!');
});

//http://localhost:3001/weather?search=Seattle
app.get('/weather', (request, response, next) => {
  try {
    let cityRequested = request.query.search;
    let cityObject = data.find(city => city.city_name === cityRequested);
    // console.log(cityObject.data);
    let forcast = cityObject.data.map(item => new Forecast(item));
    response.send(forcast);
  } catch (error) {
    next(error);
  }

});

app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

//ERRORS
//handle all the errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});


//LISTEN
//start the server
// listen is Express method that takes in two arguements, a port value and a call back function



class Forecast {
  constructor(weatherObject) {
    // this.data = weatherObject;
    //this.city_name = weatherObject.city_name;
    this.date = weatherObject.valid_date;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.max_temp} with ${weatherObject.weather.description.toLowerCase()}`;
  }

  makeWeatherArr () {
    let weatherArr = [];
    for (let i in this.data.data) {
      weatherArr.push(`Low of ${this.data.data[i].low_temp}, high of ${this.data.data[i].max_temp} with ${this.data.data[i].weather.description.toLowerCase()}`);
    }
    return weatherArr;
  }
}

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));