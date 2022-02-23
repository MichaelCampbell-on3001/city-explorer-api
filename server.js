'use strict';

console.log('Hello World, from my server!')

const { request, response } = require('express');
const express = require ('express');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hello from server');
})

app.get('*', (request, response) => {
  response.send('Not Found by Catch all');
})



app.listen(PORT, () => console.log(`Listening on port ${PORT} `));

