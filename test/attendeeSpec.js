var app = require('./helpers/app');

var should = require('should'),
request = require('supertest'),
_ = require('lodash');

var testAttendeeID = '';

describe('Attendee', function() {
	this.timeout(15000);
	it('should create a new attendee(testAttendee) in the database', function(done) {


		var newAttendee = {
			firstName: 'testFirstName',
			lastName: 'testLastName',
			email: 'testEmail@test.com',
			school: 'testSchool',
			links: {
				resume: 'testResume.com',
				github: 'testGithub.com'
			},
			references: 'testReferences',
			transportation: 'Driving',
			firstHackathon: true,
			health_Medical_BioTech_Hack: false,
			usingHardware: true
		};

		request(app)
		.post('/attendees')
		.send(newAttendee)
		.expect(200)
		.end(function(err, res) {
			if (err) {
				throw res.body.message;
			} else {
				res.status.should.equal(200);
				res.body.should.not.equal(undefined);
				testAttendeeID = res.body._id;
			}
			done();
		});
	});

	it('should return our testAttendee', function(done) {
		request(app)
		.get('/attendees/'+testAttendeeID)
		.expect(200)
		.end(function(err, res) {
			if (err) {
				throw res.body.message;
			} else {
				res.status.should.equal(200);
				res.body.firstName.should.equal('testFirstName');
			}
			done();
		});
	});

	it('should return an error for an invalid attendeeID: 999999999', function(done) {
		request(app)
		.get('/attendees/999999999')
		.expect(404)
		.end(function(err, res) {
			res.status.should.equal(404);
			done();
		});
	});

	it('should mark our testAttendee.isComing as True', function(done) {

		request(app)
		.post('/attendees/'+testAttendeeID)
		.send({isComing: true})
		.expect(200)
		.end(function(err, res) {
			if (err) {
				throw err;
				done();
			} else {
				res.status.should.equal(200);
				res.body.should.not.equal(undefined);
				request(app)
				.get('/attendees/'+testAttendeeID)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw res.body.message;
					} else {
						res.status.should.equal(200);
						res.body.isComing.should.equal(true);
					}
					done();
				});
			}
		});
	});

	it('should delete our testAttendee', function(done) {
		request(app)
		.delete('/attendees/'+testAttendeeID)
		.expect(200)
		.end(function(err, res) {
			if (err) {
				throw res.body.message;
			} else {
				res.status.should.equal(200);
				res.body.status.should.equal('deleted!');
			}
			done();
		});
	});

	it('should return an empty list of Attendees', function(done) {
		request(app)
		.get('/attendees')
		.expect(200)
		.end(function(err, res) {
			console.log('body: ', res.body);
			res.status.should.equal(200);
			res.body.length.should.equal(0);
			done();
		});
	});
});