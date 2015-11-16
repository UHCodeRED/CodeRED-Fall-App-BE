'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	config = require('../../config/config'),
	swig  = require('swig');

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');

var codeREDToken = jwt.sign({
	event: 'CodeRED',
	name: 'Fabian Buentello',
	admin: true

}, config.organizerToken);

console.log('ADMIN TOKEN  = \n'+codeREDToken);

/**
* Verify Token
*/
exports.verifyOrganizer = function(req, res, next) {

	if (req.body.checkedIn) {
		var token = req.body.checkedInBy;

		console.log(token);
		// verify a token symmetric
		jwt.verify(token, config.organizerToken, function(err, decodedToken) {
			if (err) {
				console.log('error');
				return res.status(713).send({
					message: errorHandler.getErrorMessage({code:11004})
				});
			}
			console.log(decodedToken) // bar
			return next();
		});
	} else {
		return next();
	}
};