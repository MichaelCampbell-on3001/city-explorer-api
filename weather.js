'use strict';
const axios = require('axios');

async function getWeather (request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5`
    let results = await axios.get(url);
    //console.log('RESULTS',results)
    let forecastArray = results.data.data.map(day => new Forecast(day));
    response.send(forecastArray);
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;