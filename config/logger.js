var winston = require('winston');
winston.emitErrs = true;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            level: 'info',
            filename: './logs/all-logs.log',
            // handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new (winston.transports.File)({
            level: 'error',
            name: 'error',
            filename: './logs/error-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
    ],
    exitOnError: false
});

module.exports = logger;
