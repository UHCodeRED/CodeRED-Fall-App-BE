
/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var attendeeCTRL = require('../app/controllers/attendee.server.controller');
/**
* Expose
*/

module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    res.render('home/index', {
      title: 'Node Express Mongoose Boilerplate'
    });
  });


  //Attendee Routes
  app.route('/attendees')
  .get(attendeeCTRL.list)
  .post(attendeeCTRL.create);

  app.route('/attendees/:attendeeId')
  .get(attendeeCTRL.read)
  .post(attendeeCTRL.update)
  .delete(attendeeCTRL.delete);

  // Finish by binding the Attendee middleware
  app.param('attendeeId', attendeeCTRL.attendeeByID);
};
