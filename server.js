
/**
 * Module dependencies
 */
var config = require('./config/config'),
	db = require('./config/db'),
	app = require('./app.js')(config, db);
/// Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);
