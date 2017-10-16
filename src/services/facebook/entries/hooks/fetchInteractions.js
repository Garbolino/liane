module.exports = function () {
  return function (hook) {
    if(hook.params.fbAccessToken) {
      const FB = hook.app.facebook;
      const id = hook.data.facebookId;
      const peopleService = hook.app.service('people');
      FB.setAccessToken(hook.params.fbAccessToken);
      return FB.api(id, { fields: [
        'comments',
        'likes'
      ]}).then(data => {
        console.log(data);
        return hook;
      });
    }
    return hook;
  }
}
