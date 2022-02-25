'use strict';

console.log('Hello World, from my server!')


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const weatherData = require('./data/weather.json');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from server');
});
// Make async call and await, Bring in weather url
app.get('/weather', async (request, response, next) => { 
  try {
    let searchQuery = request.query.searchQuery;
    // let url = `http://api.weatherbit.io/v2.0/forecast/daily`

    let foundCity = weatherData.find(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());
    let forecastArray = foundCity.data.map(day => new Forecast(day));
    response.send(forecastArray);
  } catch (error) {
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

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} `));

