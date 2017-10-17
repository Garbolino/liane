module.exports = function() {
  return function (hook) {
    const facebookData = hook.data.facebookData;
    if(facebookData !== undefined) {
      if(!hook.data.name || !hook.data.facebookId) {
        return hook.service.find({
          query: {
            facebookId: facebookData.id
          }
        }).then(res => {
          if(res.data.length) {
            const user = res.data[0];
            if(!user.name) {
              hook.data.name = hook.data.facebookData.name;
            }
            if(!user.facebookId) {
              hook.data.facebookId = hook.data.facebookData.id;
            }
          } else {
            hook.data.name = hook.data.facebookData.name;
            hook.data.facebookId = hook.data.facebookData.id;
          }
          return hook;
        });
      }
    } else {
      return hook;
    }
  }
}
