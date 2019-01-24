const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv');

const indexRouter   = require('./routes/index');
const app           = express();
dotenv.config();

// Middlewares
app.use( bodyParser.json() );
app.use( logger('dev') );

// Routes
app.use( '/' , indexRouter);

module.exports = app;