const FB = require('fb');
const crypto = require('crypto');
const { URL } = require('url');

module.exports = function() {
  const app = this;
  const { clientID, clientSecret } = app.get('facebook');
  const siteUrl = new URL(app.get('url'));

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
    // Set app link url
    FB.api(clientID, 'post', {
      link: siteUrl.origin,
      website_url: siteUrl.origin,
      app_domains: [siteUrl.hostname],
      access_token: res.access_token
    });
    // Set page subscription
    FB.api(clientID + '/subscriptions', 'post', {
      object: 'page',
      callback_url: siteUrl.origin + '/facebookAccounts/subscriptions',
      fields: [
        'feed',
        'messages',
        'ratings',
        'mention'
      ],
      verify_token: app.get('fbVerifyToken'),
      access_token: res.access_token
    });
  });
}
