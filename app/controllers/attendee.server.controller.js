'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Attendee = mongoose.model('Attendee'),
	emailServer = require('../../config/email'),
	_ = require('lodash'),
	config = require('../../config/config'),
	sendgrid  = require('sendgrid')(config.sendGridAPI_Key),
	swig  = require('swig');

/**
* Create a Attendee
*/
exports.doesExist = function(req, res, next) {
	Attendee.count({email: req.body.email}, function(err, count){
		console.log( "Number of Attendees:", count );
		if (count) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage({code:11002})
			});
		} else {
			next();
		}
	});
};
exports.create = function(req, res, next) {
	var attendee = new Attendee(req.body);
	attendee.save(function(saveErr) {
		if (saveErr) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(saveErr)
			});
		} else {
			console.log('were responding with an attendee!');
			req.attendee = attendee;
			next();
			// res.jsonp(attendee);
		}
	});
};

exports.sendEmail = function(req, res, next) {
	emailServer.confirmationEmail(req.body, function(emailErr) {
		if (emailErr) {
			return res.status(400).send({
				message: emailErr
			});

		} else {
			req.body.confirmationEmail = true;
			next();
		}
	});
};


/**
* Show the current Attendee
*/
exports.read = function(req, res, next) {
	res.jsonp(req.attendee);
};

/**
* Update a Attendee
*/
exports.update = function(req, res, next) {
	console.log('inside of update');
	var attendee = req.attendee;

	attendee = _.extend(attendee , req.body);

	attendee.update(req.body, function(updateErr, raw) {
		if (updateErr) {
			console.log('inside of completionhandler');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(updateErr)
			});
		}
		console.log('The raw response from Mongo was ', raw);
		return res.jsonp(attendee);
	});
};

/**
* Delete an Attendee
*/
exports.delete = function(req, res, next) {
	res.send("Ooops You're not supposed to be here");
	/*
	var attendee = req.attendee ;

	attendee.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp({
				attendee: attendee,
				status: 'deleted!'
			});
		}
	});*/
};

/**
* List of Attendees
*/
exports.list = function(req, res, next) {
	res.send("Ooops You're not supposed to be here");
	/*
	Attendee.find().sort('-created').populate('user', 'displayName').exec(function(err, attendees) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendees);
		}
	});*/
};

/**
* Attendee middleware
*/
exports.attendeeByID = function(req, res, next, id) {
	Attendee.findById(id).populate('user', 'displayName').exec(function(err, attendee) {
		if (err) return next(err);
		if (! attendee) return next(new Error('Failed to load Attendee ' + id));
		req.attendee = attendee ;
		next();
	});
};

/**
* Attendee authorization middleware
*/
exports.hasAuthorization = function(req, res, next) {
	if (req.attendee.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
