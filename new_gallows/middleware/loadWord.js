var Word = require('../models/word').Word;

module.exports = function (req, res, next) {

	function randomInt (low, high) {
		return Math.floor(Math.random() * (high - low) + low);
	}

	var randomWordNumber = randomInt(0, 101).toString();

	Word.findOne({ 'rowid': randomWordNumber}, 'rowid name', function (err, word) {
		if (err) return next(err);

		req.word = res.locals.word = word = word.name.toLowerCase();
		next();
	});
}