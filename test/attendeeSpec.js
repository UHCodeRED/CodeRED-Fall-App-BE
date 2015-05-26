var app = require('./helpers/app');

var should = require('should'),
request = require('supertest'),
_ = require('lodash');



describe('Attendee', function() {
	this.timeout(15000);

	it('should return valid attendee for attendeeID: 555ceac57039569010fa5040', function(done) {
		request(app)
		.get('/attendees/555ceac57039569010fa5040')
		.expect(200)
		.end(function(err, res) {
			res.status.should.equal(200);
		});
		done();
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

	it('should mark Attendee as isComing', function(done) {

		request(app)
		.post('/attendees/555ceac57039569010fa5040')
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
				.get('/attendees/555ceac57039569010fa5040')
				.expect(200)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.isComing.should.equal(true);
					done();
				});
			}

		});
	});
});