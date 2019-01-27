const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const uuid  = require('uuid/v1');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);

dotenv.config();
const indexRouter = require('./routes/index');
const app = express();

// Use the public page and set ejs as the view engine
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Middlewares
app.use(session({
    genid : function(req){
        return uuid();
    },
    store : new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true, maxAge : 60000 }
}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Routes
app.use('/', indexRouter);

module.exports = app;