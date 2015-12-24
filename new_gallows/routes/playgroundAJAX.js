exports.get = function(req, res, next) {
	function randomInt (low, high) {
		return Math.floor(Math.random() * (high - low) + low);
	}

	var randomWordNumber = randomInt(0, 101).toString();
	var Word = require('../models/word').Word;

	Word.findOne({ 'rowid': randomWordNumber}, 'rowid name', function (err, word) {
		if (err) return next(err);

		var wordToSend = word.name.toLowerCase();
		res.json({ word: wordToSend });
	});
};