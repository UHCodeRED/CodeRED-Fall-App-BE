
/**
* Module dependencies
*/
var fs = require('fs');
var app = require('express')();
var passport = require('passport');

module.exports = function(config, db) {

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
		next();
	});
	app.options('*', function(req, res) {
		res.send(200);
	});
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

