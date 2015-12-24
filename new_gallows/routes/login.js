var User = require('../models/user').User;
var async = require('async');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;


exports.post = function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	console.log(username, password);

	User.authorize(username, password, function (err, user) {
		if (err) {
			if (err instanceof AuthError) {
				return next(new HttpError(403, err.message));
			} else {
				return next(err);
			}
		}

		req.session.user = user._id;
		res.redirect('/playground');
	})
}