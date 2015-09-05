
/**
 * Expose
 */

module.exports = {
  environment: 'development',
  db: process.env.MongoDB_DEV || 'DATABASE-URL',
  sendgrid_username: process.env.sendgrid_username || 'sendgrid_username',
  sendgrid_password: process.env.sendgrid_password || 'sendgrid_password',
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
