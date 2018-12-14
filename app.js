var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var cors = require('cors');

var indexRouter = require('./routes/index');
var twitterRouter = require('./routes/twitter');

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('../data/tweets.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS tweets (\n" +
      "\ttweet_id integer PRIMARY KEY UNIQUE,\n" +
      "\ttweet text NOT NULL,\n" +
      "\tcreated_at text NOT NULL,\n" +
      "\tuser_name text NOT NULL,\n" +
      "\tuser_id text NOT NULL\n" +
      ");");
  db.close()
});

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/twitter', twitterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
