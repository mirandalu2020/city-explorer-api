'use strict';

console.log('Our first server in Code Fellows');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
// const data = require('./data/weather.json');


// must use express
const app = express();
app.use(cors());

//define a port and validate env is working
const PORT = process.env.PORT || 3002;
const WEATHER_TOKEN = process.env.WEATHERBIT_API_KEY;
const MOVIE_TOKEN = process.env.MOVIEDB_API_KEY;

//the first arugment is a URL in quote
//the second argument is the callback that defines waht should happen when a request comes into the url
app.get('/', (request, response) => {
  response.send('hello from the server!');
});

// //http://localhost:3001/weather?search=Seattle
// app.get('/weather', (request, response, next) => {
//   try {
//     let cityRequested = request.query.search;
//     let cityObject = data.find(city => city.city_name === cityRequested);
//     // console.log(cityObject.data);
//     let forcast = cityObject.data.map(item => new Forecast(item));
//     response.send(forcast);
//   } catch (error) {
//     next(error);
//   }

// });

//http://api.weatherbit.io/v2.0/forecast/daily?lat=47.6038321&lon=-122.330062&key=39cf8e2e9ef54799b2ea72f9bcc79192&days=3
app.get('/weather', async (request, response) => {
  let cityLat = request.query.lat;
  let cityLong = request.query.lon;
  let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${cityLat}&lon=${cityLong}&key=${WEATHER_TOKEN}`;
  console.log(weatherURL);
  let weatherDataResults = await axios.get(weatherURL);
  console.log(weatherDataResults);
  let sendWeatherData = weatherDataResults.data.data.map(item => new Forecast(item));
  // console.log('send weather data' + sendWeatherData);
  response.send(sendWeatherData);
});

//https://api.themoviedb.org/3/search/movie?api_key=8ea253856ba61cbf411c6d7b4a4d3e51&language=en-US&page=1&include_adult=false&query=Seattle
app.get('/movie',async (request,response) => {
  let cityMovie = request.query.city;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_TOKEN}&language=en-US&page=1&include_adult=false&query=${cityMovie}`;
  console.log(movieURL);
  let movieDataResults = await axios.get(movieURL);
  let sendMovieData = movieDataResults.data.results.map(item => new Movie(item));
  console.log('my data' + sendMovieData);
  response.send(sendMovieData);
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
}

class Movie {
  constructor(movieObject) {
    // this.data = weatherObject;
    //this.city_name = weatherObject.city_name;
    this.date = movieObject.original_title;
    this.overview = movieObject.overview;
    this.average_votes = movieObject.vote_average;
    this.total_votes = movieObject.vote_count;
    this.image_url = movieObject.poster_path;
    this.popularity = movieObject.popularity;
    this.released_on = movieObject.release_date;
  }
}

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
