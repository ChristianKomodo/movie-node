var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Mongoose and schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Load the Movie model
var Movie = require('./models/movie');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







//Set up default mongoose connection
var mongoDB = "mongodb://localhost:27017/movies";
mongoose.connect(mongoDB, {
	useNewUrlParser: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




// Make two movies
var movie1 = new Movie({
	name: 'Alien',
	releaseDate: 1979,
	votes: 1
});
var movie2 = new Movie({
	name: 'Jaws',
	releaseDate: 1975,
	votes: 0
});

movie1.save(function (err) {
	if (err) throw err;
	console.log('Movie 1 created!');
});
movie2.save(function (err) {
	if (err) throw err;
	console.log('Movie 2 created!');
});





app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;