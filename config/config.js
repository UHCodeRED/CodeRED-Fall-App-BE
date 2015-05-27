
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');


/**
 * Expose
 */

module.exports = {
  development: development,
  test: test,
  production: production,
  root: path.normalize(__dirname + '/..')
}[process.env.NODE_ENV || 'development'];
