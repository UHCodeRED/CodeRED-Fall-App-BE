
/**
* Module dependencies
*/

module.exports = function(config, db) {
	var fs = require('fs');
	var express = require('express');
	var passport = require('passport');


	var app = express();


	db(config);


	// Bootstrap models
	fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
		if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
	});

	// Bootstrap passport config
	require('./config/passport')(passport, config);

	// Bootstrap application settings
	require('./config/express')(app, passport);

	// Bootstrap routes
	require('./config/routes')(app, passport);

	return app;
};

