'use strict';

const axios = require('axios');


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

async function getMovies (request,response, next) {
  let cityMovie = request.query.city;
  console.log(cityMovie);
  // let params = {
  //   client_id:process.env.MOVIEDB_API_KEY,
  //   query: cityMovie
  // };

  //https://api.themoviedb.org/3/search/movie?api_key=8ea253856ba61cbf411c6d7b4a4d3e51&language=en-US&page=1&include_adult=false&query=Seattle

  let config = {
    baseURL: 'https://api.themoviedb.org/3/search/movie',
    params: {
      api_key:process.env.MOVIEDB_API_KEY,
      query: cityMovie,
    },
    method:'get',
  };

  //let movieURL = 'https://api.themoviedb.org/3/search/movie';
  try{
    let movieDataResults = await axios(config)
    let sendMovieData = movieDataResults.data.results.map(item => new Movie(item));
    response.send(sendMovieData);
  } catch (err){
    Promise.resolve().then(()=> {
      throw new Error(err.message);
    }).catch(next);
  }


  // .then() takes in a callback fn
  // .then() contains Promise

  // axios.get(movieURL, { params } )
  //   .then(resultsURL => resultsURL.data.results
  //     .map(item => new Movie(item)))
  //   .then(sendMovieData => response.status(200).send(sendMovieData))
  //   .catch(error => console.log.error(error));

}

module.exports = getMovies;
