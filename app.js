
/**
* Module dependencies
*/
var fs = require('fs');
var app = require('express')();
var passport = require('passport');
var env = process.env.NODE_ENV || 'development';
var methodOverride = require('method-override');

module.exports = function(config, db) {

	app.use(function(req, res, next) {
		if (env === 'development' || env === 'test') {
			res.header("Access-Control-Allow-Origin", "*");
		}
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	app.options('*', function(req, res) {
		res.sendStatus(200);
	});

	app.use(methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			var method = req.body._method;
			delete req.body._method;
			return method;
		}
	}));
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

