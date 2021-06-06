require('marko/node-require');
const express = require('express');
const markoExpress = require('marko/express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const { NODE_ENV } = require('./config');
require('dotenv').config();

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(markoExpress());
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(function errorHandler(error, req, res, next) {
  let response;
  if(NODE_ENV === 'production') {
    response = { error: { message: 'Internal Server Error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
})

module.exports = app;
