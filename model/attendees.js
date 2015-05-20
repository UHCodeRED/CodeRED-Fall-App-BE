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
 		enum: ['Driving','Riding with Friend','CodeRED Provided Bus','3rd Party Bus','Flight','I live on/near campus','Other',''],
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
 	}
 });

 mongoose.model('Attendee', AttendeeSchema);
