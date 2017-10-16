const errors = require('feathers-errors');

module.exports = function () {
  return function (hook) {
    const FB = hook.app.facebook;
    const account = hook.result;
    FB.setAccessToken(account.accessToken);
    return FB.api(account.facebookId + '/subscribed_apps', 'post')
      .then(res => {
        FB.setAccessToken('');
        return hook;
      })
      .catch(err => {
        FB.setAccessToken('');
        throw new errors.GeneralError(err);
      });
  }
}
