var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie');

// MAKE
router.get('/make', function (req, res, next) {
  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('connected to the database'))
    .catch(err => console.error('error connecting to db: ', err.errmsg));

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
  res.status(200).send('Saved!');
});

// GET
router.get('/', function (req, res, next) {
  Movie.find()
    .then(movies => {
      console.log('movies is ', movies);
      res.render('movies', { title: 'movie page', movies: movies });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
});

// POST
router.post('/', function (req, res, next) {

  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('connected to the database'))
    .catch(err => console.error('error connecting to db: ', err.errmsg));

  console.log('req.body is ', req.body);

  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Movie content can not be empty"
    });
  }

  // Create a Movie
  const movie = new Movie({
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    votes: 0
  });

  console.log('req.body is now ', req.body);

  // Save Movie in the database
  movie.save()
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
});

module.exports = router;
