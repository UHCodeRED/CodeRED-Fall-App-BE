'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Attendee = mongoose.model('Attendee'),
	_ = require('lodash');

/**
 * Create a Attendee
 */
exports.create = function(req, res) {
	console.log('were creating an attendee!');
	var attendee = new Attendee(req.body);

	attendee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('were responding with an attendee!');
			res.jsonp(attendee);
		}
	});
};

/**
 * Show the current Attendee
 */
exports.read = function(req, res) {
	res.jsonp(req.attendee);
};

/**
 * Update a Attendee
 */
exports.update = function(req, res) {
	var attendee = req.attendee ;

	attendee = _.extend(attendee , req.body);

	attendee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendee);
		}
	});
};

/**
 * Delete an Attendee
 */
exports.delete = function(req, res) {
	var attendee = req.attendee ;

	attendee.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendee);
		}
	});
};

/**
 * List of Attendees
 */
exports.list = function(req, res) {
	Attendee.find().sort('-created').populate('user', 'displayName').exec(function(err, attendees) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendees);
		}
	});
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
