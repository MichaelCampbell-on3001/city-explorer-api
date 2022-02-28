'use strict';
const axios = require('axios');

async function getMovies (request, response, next) {
  let location = request.query.location
  console.log('MOVIE LOCATION',location)
  try {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}` 
    let results = await axios.get(url);
    console.log('RESULTS',results.data.results)
  let movieArray = results.data.results.map(film => new Movie(film));
  response.send(movieArray);
  } catch (error){
    next(error);
  }
}

class Movie {
  constructor(film) {
    this.title = film.title;
    //this.overview = film.overview;
    
  }
}
module.exports = getMovies;