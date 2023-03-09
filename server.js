'use strict';

console.log('Our first server in Code Fellows');
require('dotenv').config();
const express = require('express');

const cors = require('cors');
const axios = require('axios');
// const data = require('./data/weather.json');

// must use express
const app = express();
app.use(cors());

const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

//define a port and validate env is working
const PORT = process.env.PORT || 3002;



//the first arugment is a URL in quote
//the second argument is the callback that defines waht should happen when a request comes into the url
app.get('/', (request, response) => {
  response.status(200).send('hello from the server!');
});


app.get('/weather', getWeather);

////////////////////////////////////////////////////////////////////////
///Get Movie Data
app.get('/movie', getMovies);

app.get('*', (req, res) => {
  res.status.send('The resource does not exist');
});

//ERRORS
//handle all the errors
app.use((error, request, response) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

//LISTEN
//start the server
// listen is Express method that takes in two arguements, a port value and a call back function

app.listen(PORT, () => console.log(`listening on ${PORT}`));
