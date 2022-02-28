'use strict';

console.log('Hello World, from my server!')


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
//const weatherData = require('./data/weather.json');
// I dont need the const weatherData?
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

// import modules
const getWeather = require('./weather.js');

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from server');
});

app.get('/weather', getWeather);


// async (request, response, next) => {
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5`
//     let results = await axios.get(url);
//     //console.log('RESULTS',results)
//     let forecastArray = results.data.data.map(day => new Forecast(day));
//     response.send(forecastArray);
//   } catch (error) {
//     next(error);
//   }
// });



app.get('/movies', async (request, response, next) => {
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
});

app.get('/sayHello', (request, response) => {
  let name = request.query.name;
  console.log(request.query);
  console.log(name);
  response.status(200).send(`Welcome ${name}, from the server!`);
});

app.get('*', (request, response) => {
  response.status(404).send('Not Found');
});

// class Forecast {
//   constructor(day) {
//     this.date = day.datetime;
//     this.description = day.weather.description;
//   }
// }

class Movie {
  constructor(film) {
    this.title = film.title;
    //this.overview = film.overview;
    
  }
}

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} `));

