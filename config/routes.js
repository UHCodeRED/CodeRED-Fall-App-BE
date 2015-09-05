
/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var Attendee = require('../app/controllers/attendee.server.controller');
var methodOverride = require('method-override');
/**
* Expose
*/

module.exports = function (app, passport) {

  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  app.get('/', function (req, res) {
    res.render('home/index', {
      title: 'Node Express Mongoose Boilerplate'
    });
  });

  //Attendee Routes
  app.all('/attendees', function (req, res, next) {
    console.log('Accessing the secret section ...');

    next(); // pass control to the next handler
  })
  .get('/attendees',Attendee.list)
  .post('/attendees', Attendee.doesExist, Attendee.create, Attendee.sendEmail, Attendee.update);


  app.route('/attendees/:attendeeId')
  .get(Attendee.read)
  .post(Attendee.update)
  .delete(Attendee.delete);

  // Finish by binding the Attendee middleware
  app.param('attendeeId', Attendee.attendeeByID);
};
