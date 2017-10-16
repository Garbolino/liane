module.exports = function () {
  return function (hook) {
    const FB = hook.app.facebook;
    const account = hook.result;
    FB.setAccessToken(account.accessToken);
    return FB.api(`${account.facebookId}/feed`, { fields: [
      { likes: ['id', 'name'] },
      { comments: ['likes', 'messages', 'from'] },
      'shares',
    ]}).then(data => {
      FB.setAccessToken('');
      console.log(data);
      return hook;
    });
  }
}
