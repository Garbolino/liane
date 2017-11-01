module.exports = function () {
  return function fetchFBAdAccount (hook) {
    const FB = hook.app.facebook;
    const accessToken = hook.data.facebookData.accessToken;
    return FB.api('me/adaccounts', {
      access_token: accessToken
    }).then(res => {
      hook.data.facebookData.adAccounts = res.data;
      return hook;
    });
  }
}
