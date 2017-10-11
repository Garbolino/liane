const FB = require('fb');

module.exports = function() {
  const app = this;
  const config = app.get('authentication');
  FB.options({
    appId: config.facebook.clientID,
    appSecret: config.facebook.clientSecret
  });
  app.facebook = FB;
}
