module.exports = function(config) {
	var mongoose = require('mongoose');

	console.log('Environment: '+ config.environment);

	// Connect to mongodb
	var connect = function () {
		var options = { server: { socketOptions: { keepAlive: 1 } } };
		mongoose.connect(config.db, options);
	};
	connect();

	mongoose.connection.on('error', console.log);
	mongoose.connection.on('disconnected', connect);
};
