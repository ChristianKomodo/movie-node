var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var movieSchema = new mongoose.Schema({
	name: String,
	releaseDate: Number,
	date: {
		type: Date,
		default: Date.now
	},
	votes: Number
});

var Movie = mongoose.model('Movie', movieSchema);


// make this available to our users in our Node applications
module.exports = Movie;