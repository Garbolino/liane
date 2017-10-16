const FB = require('fb');
const crypto = require('crypto');

module.exports = function() {
  const app = this;
  const config = app.get('authentication');
  const url = app.get('url');
  const { clientID, clientSecret } = config.facebook;

  app.set('fbVerifyToken', crypto.randomBytes(12).toString('hex'));

  FB.options({
    version: 'v2.10',
    appId: clientID,
    appSecret: clientSecret
  });
  app.facebook = FB;
  // Get app access token
  FB.api('oauth/access_token', {
    client_id: clientID,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  }, res => {
    // Set page subscription
    FB.setAccessToken(res.access_token);
    FB.api(clientID + '/subscriptions', 'post', {
      object: 'page',
      callback_url: url + '/facebookAccounts/subscriptions',
      fields: [
        'feed',
        'messages',
        'ratings',
        'mention'
      ],
      verify_token: app.get('fbVerifyToken')
    });
  });
}
