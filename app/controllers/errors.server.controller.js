'use strict';

/**
 * Get unique error field name
 */
 var getUniqueErrorMessage = function(err) {
 	var output;

 	try {
 		var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
 		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

 	} catch (ex) {
 		output = 'Unique field already exists';
 	}

 	return output;
 };

/**
 * Get the error message from error object
 */
 exports.getErrorMessage = function(err) {
 	var message = '';


 	if (err.code) {
 		switch (err.code) {
 			case 11000:
 			case 11001:
 			message = getUniqueErrorMessage(err);
 			break;
 			case 11002:
 			message = "Looks like you have already signed up. We will let you know soon if you were accepted.";
 			break;
 			case 11003:
 			message = "Looks like you haven't signed up yet.";
 			break;
 			case 11004:
 			message = 'Invalid Organizer Token'
 			break;
 			default:
 			message = 'Something went wrong';
 		}
 	} else {
 		for (var errName in err.errors) {
 			if (errName === 'transportation')
 				message = 'Please fill in a form of transportation';
 			else
 				if (err.errors[errName].message) message = err.errors[errName].message;

 		}
 	}

 	return message;
 };
