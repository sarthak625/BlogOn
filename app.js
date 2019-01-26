const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv');
const path          = require('path');

dotenv.config();
const indexRouter   = require('./routes/index');
const app           = express();

// Use the public page and set ejs as the view engine
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

// Middlewares
app.use(express.urlencoded({ extended : true }));
app.use( bodyParser.json() );
app.use( logger('dev') );

// Routes
app.use( '/' , indexRouter);

module.exports = app;