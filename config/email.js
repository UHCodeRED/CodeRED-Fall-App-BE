'use strict';

/**
* Module dependencies.
*/
var config = require('./config'),
	sendgrid = require('sendgrid')(config.sendgrid_username, config.sendgrid_password),
	swig  = require('swig');

/**
* Send Email to User
*/
exports.confirmationEmail = function(attendee, cb) {
	var person= {
		email: attendee.email,
		first: attendee.firstName,
		last: attendee.lastName
	};
	console.log(person);
	try {
		var email     = new sendgrid.Email({
			to:       person.email,
			from:     'hackathon@cougarcs.com',
			subject:  'CodeRED Liftoff Application Received',
			html:     swig.renderFile('./app/views/email/confirmation.html', {
					firstName: attendee.firstName,
					lastName: attendee.lastName
				})
		});
		sendgrid.send(email, function(err, json) {
			if (err) {
				console.error('error happened',err);
				return cb(err);
			} else {
				console.log('success',json);
				return cb(null,json);
			}
		});
	} catch (error) {
		console.error('error:', error);
		return cb(error);
	}
};