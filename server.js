'use strict';

console.log('Hello World, from my server!')

const { request, response } = require('express');
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 3002;
const weatherData = require('./data/weather.json');
require('dotenv').config();
const cors = require('cors');

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from server');
});

app.get('/weather', (request, response) => {
  try{
let cityName = request.query.cityName;

let foundCIty = weatherData.find(weather => weather.city_name === cityName);
let forecastArray = foundCity.data.map(day => new Forecast(day));
response.send(forecastArray);
} catch (error) {
  throw new Error(`Weather Currently Unavailable`);
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
    this.date = daytime;
    this.description = day.weather.description;
  }
}

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} `));

