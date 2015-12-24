exports.post = function(req, res) {
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/playground');
		};
	})
};