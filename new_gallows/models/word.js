var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var wordSchema = new Schema({
	rowid: Number,
	name: String,
	part_sp: String,
	rate_abs: Number,
	page_resp: Number
});

exports.Word = mongoose.model('Word', wordSchema, 'dictionary');
