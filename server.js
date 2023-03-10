'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const getMovies = require('./modules/movies.js');
app.get('/movie', getMovies);

const weather = require('./modules/weather.js');
app.get('/weather', weatherHandler);


function weatherHandler(request, response) {
  const { lat, lon } = request.query; //get lat and lon from query from front end
  weather(lat, lon) //use the lat and lon and plug it into weather that's imported
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
