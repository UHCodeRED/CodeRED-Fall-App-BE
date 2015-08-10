'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	errorHandler = require('../app/controllers/errors.server.controller'),
	_ = require('lodash'),
	config = require('./config'),
	sendgrid  = require('sendgrid')(config.sendGridAPI_Key),
	swig  = require('swig');

/**
* Send Email to User
*/
exports.confirmationEmail = function(attendee, cb) {

	sendgrid.send({
		to:       attendee.email,
		from:     'hackathon@cougarcs.com',
		subject:  'CodeRED Liftoff Application Received',
		html:     swig.renderFile('./app/views/email/confirmation.html', {
					firstName: attendee.firstName,
					lastName: attendee.lastName
				})
	}, function(err, json) {
		if (err) {
			console.log('error happened');
			cb(err);
		} else {
			console.log('success',json);
			cb(null);
		}
	});
};