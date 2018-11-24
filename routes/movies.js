var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie');

// GET
router.get('/', function (req, res, next) {

  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('connected to the database'))
    .catch(err => console.error('error connecting to db: ', err.errmsg));

  Movie
    .find()
    .sort('name')
    .then(movies => {
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

  // Validate request
  if (!req.body.name || !req.body.releaseDate) {
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

  // Save Movie in the database
  movie.save()
    .then(movies => {
      res.status(200).redirect('movies');
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the movie entry."
      });
    });
});

// DELETE
router.delete('/:id', function (req, res, next) {

  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('connected to the database'))
    .catch(err => console.error('error connecting to db: ', err.errmsg));

  Movie.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log('worked');
      res.status(200).redirect('movies');
    }).catch(err => {
      console.log('did not work');
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the movie entry."
      });
    });
});

// MAKE
router.get('/make', function (req, res, next) {
  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('connected to the database'))
    .catch(err => console.error('error connecting to db: ', err.errmsg));

  // Make two example movies to populate the database
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
  });
  movie2.save(function (err) {
    if (err) throw err;
  });
  res.status(200).send('Saved!');
});

module.exports = router;
