module.exports = function() {
  return function (hook) {
    const service = hook.app.service('users');
    const facebookData = hook.data.facebook;
    if(facebookData !== undefined) {
      hook.data.facebookData = {
        ...hook.data.facebook.profile._json,
        accessToken: hook.data.facebook.accessToken
      };
      if(!hook.data.email) {
        return service.find({
          query: {
            facebookId: facebookData.profile.id
          }
        }).then(res => {
          if(res.data.length) {
            const user = res.data[0];
            if(!user.email) {
              hook.data.email = hook.data.facebookData.email;
            }
          } else {
            hook.data.email = hook.data.facebookData.email;
          }
          return hook;
        });
      }
    } else {
      return hook;
    }
  }
}
