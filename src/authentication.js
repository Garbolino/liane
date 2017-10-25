const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const oauth2 = require('feathers-authentication-oauth2');
const FacebookStrategy = require('passport-facebook');

module.exports = function () {
  const app = this;
  const config = app.get('authentication');
  const siteUrl = app.get('url');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local({
    entity: 'user',
    service: 'users',
    usernameField: 'email',
    passwordField: 'password'
  }));

  app.configure(oauth2(Object.assign({
    name: 'facebook',
    Strategy: FacebookStrategy,
    // authType: 'rerequest',
    callbackURL: siteUrl + '/auth/facebook/callback',
    successRedirect: '/',
    profileFields: [
      'id',
      'displayName',
      'first_name',
      'last_name',
      'email',
      'gender',
      'profileUrl',
      'accounts',
      'birthday',
      'picture',
      'permissions'
    ],
    scope: [
      'public_profile',
      'email',
      'user_friends',
      'manage_pages',
      'pages_show_list'
    ]
  }, config.facebook)));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
