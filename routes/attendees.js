'use strict';

var express = require('express'),
	router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

    var attendees = require('../controllers/attendee.server.controller');

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))




// Attendees Routes
router.route('/')
.get(attendees.list)
.post(attendees.create);

router.route('/:attendeeId')
.get(attendees.read)
.put(attendees.update)
.delete(attendees.delete);

// Finish by binding the Attendee middleware
router.param('attendeeId', attendees.attendeeByID);


module.exports = router;