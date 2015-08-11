
/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var Attendee = require('../app/controllers/attendee.server.controller');
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
  .get(Attendee.list)
  .post(Attendee.doesExist,Attendee.create,Attendee.sendEmail,Attendee.update);

  app.route('/attendees/:attendeeId')
  .get(Attendee.read)
  .post(Attendee.update)
  .delete(Attendee.delete);

  // Finish by binding the Attendee middleware
  app.param('attendeeId', Attendee.attendeeByID);
};
