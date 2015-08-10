
/**
 * Module dependencies
 */
var config = require('./config/config'),
	db = require('./config/db'),
	app = require('./app.js')(config, db),
	emailServer = require('./config/email');
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);
