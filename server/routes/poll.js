const mongoose = require('mongoose');
const crypto = require('crypto');

var pollSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	address: String,
	status: String,
	startDate: Date,
	endDate: Date
}, { collection: 'polllist' });

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;