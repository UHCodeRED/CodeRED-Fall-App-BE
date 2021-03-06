
/**
* Module dependencies.
*/

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var swig = require('swig');
var path = require('path');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var helpers = require('view-helpers');
var config = require('./config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
* Expose
*/

module.exports = function (app, passport) {

	// Compression middleware (should be placed before express.static)
	app.use(compression({
		threshold: 512
	}));

	// Static files middleware
	app.use(express.static(path.join(__dirname, '../public')));

	// Use winston on production
	var log;
	if (env !== 'development') {
		log = {
			stream: {
				write: function (message, encoding) {
					winston.info(message);
				}
			}
		};
	} else {
		log = 'dev';
	}

	// Don't log during tests
	// Logging middleware
	//  if (env !== 'test') app.use(morgan('default', log));

	// Swig templating engine settings
	if (env === 'development' || env === 'test') {
		swig.setDefaults({
			cache: false
		});
	}

	// set views path, template engine and default layout
	app.engine('html', swig.renderFile);
	app.set('views', './app/views');
	app.set('view engine', 'html');

	// expose package.json to views
	app.use(function (req, res, next) {
		res.locals.pkg = pkg;
		res.locals.env = env;
		next();
	});

	// bodyParser should be above methodOverride
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false }));
	// cookieParser should be above session
	app.use(cookieParser());
	app.use(cookieSession({ secret: process.env.cookieSessionSecret || 'secret' }));
	app.use(session({
		secret: pkg.name,
		proxy: true,
		resave: true,
		saveUninitialized: true,
		store: new mongoStore({
			url: config.db,
			collection : 'sessions'
		})
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages - should be declared after sessions
	app.use(flash());

	// should be declared after session and flash
	app.use(helpers(pkg.name));

};
