module.exports = function () {
  return function (hook) {
    const FB = hook.app.facebook;
    return FB.api('oauth/access_token', {
      client_id: FB.options('appId'),
      client_secret: FB.options('appSecret'),
      grant_type: 'fb_exchange_token',
      fb_exchange_token: hook.data.facebookData.accessToken
    }).then(data => {
      hook.data.facebookData.accessToken = data.access_token;
      return hook;
    })
  }
};
