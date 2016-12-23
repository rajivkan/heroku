var mongoose = require('mongoose'),
    masterDB = require('../config/db/masterDB');

//Create the dummy Schema
var dummySchema = new mongoose.Schema({
	title: {
		type: String
	}
});

//Exports the dummy Schema
module.exports = masterDB.model('Dummy', dummySchema);