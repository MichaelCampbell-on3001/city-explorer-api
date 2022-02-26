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

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from server');
});

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5`
    let results = await axios.get(url);

    let forecastArray = results.data.data.map(day => new Forecast(day));
    response.send(forecastArray);
  } catch (error) {
    next(error);
  }
});

// app.get('/movies', async (request, response, next) => { 
//   try {
//     let url = `https://api.themoviedb.org/3/search/movie?${process.env.MOVIE_API_KEY&query=${title}`
//     let title = request.query.title
//     let overview = request.query.overview
//     let results = await axios.get(url);
//     let movieArray = results.results.data.map(title => new Movie(title));
//     response.send(moviesArray);
//   } catch (error) {
//     next(error);
//   }
// });

app.get('/sayHello', (request, response) => {
  let name = request.query.name;
  console.log(request.query);
  console.log(name);
  response.status(200).send(`Welcome ${name}, from the server!`);
});

app.get('*', (request, response) => {
  response.status(404).send('Not Found');
});

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

// class Movies {
//   constructor(title) {
//     this.title = title;
//     this.overview = overview;
//     this.average_votes = score;
//   }
// }

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} `));

