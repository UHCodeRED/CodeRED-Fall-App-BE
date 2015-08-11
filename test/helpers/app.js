var config = require('../../config/config'),
	db = require('../data/db'),
	app = require('../../app');

module.exports = app(config, db);