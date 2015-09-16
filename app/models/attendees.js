'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Attendee Schema
*/
var AttendeeSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill First name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill Last name',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill email',
		trim: true
	},
	school: {
		type: String,
		default: '',
		required: 'Please fill school',
		trim: true
	},
	links: {
		github: {
			type: String,
			default: '',
			trim: true
		},
		resume: {
			type: String,
			default: '',
			trim: true
		}
	},
	references: {
		type: String,
		default: ''
	},
	transportation: {
		type: String,
		enum: ['Driving','Riding with Friend','CodeRED Provided Bus','3rd Party Bus','Flight','I live on/near campus','Other'],
		default: ''
	},
	firstHackathon: {
		type: Boolean,
		default: false
	},
	health_Medical_BioTech_Hack: {
		type: Boolean,
		default: false
	},
	usingHardware: {
		type: Boolean,
		default: false
	},
	confirmationEmail:{
		type: Boolean,
		default: false
	},
	acceptedEmailSent:{ //used for mass acceptance email
		type: Boolean,
		default: false
	},
	created_at: Date,
	updated_at: Date,
	/* ==========================================================================
	   has accepted
	========================================================================== */
	isComing: {
		type: Boolean,
		default: false
	},
	shirtSize : {
		type: String,
		enum: ['','S', 'M', 'L', 'XL', '2XL', '3XL'],
		default: ''
	},
	dietaryRestrictions : {
	    Halal: {type: Boolean, default: false },
	    Kosher: {type: Boolean, default: false },
	    Vegan: {type: Boolean, default: false },
	    Vegetarian: {type: Boolean, default: false },
	    NoDairy: {type: Boolean, default: false },
	    NoPeanuts: {type: Boolean, default: false },
	    Other: {type: Boolean, default: false }
	},
	comments : {
		type: String,
		default: '',
		trim: true
	}
});

// on every save, add the date
AttendeeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
  	this.created_at = currentDate;

  next();
});

mongoose.model('Attendee', AttendeeSchema);
