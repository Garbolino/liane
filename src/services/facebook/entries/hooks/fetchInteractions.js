module.exports = function () {
  return function (hook) {
    if(hook.params.fbAccessToken) {
      const FB = hook.app.facebook;
      const id = hook.result.facebookId;
      const service = hook.app.service('interactions');
      FB.setAccessToken(hook.params.fbAccessToken);
      return FB.api(id, { fields: [
        'comments',
        'likes'
      ]}).then(data => {
        const defaultItem = {
          entryId: hook.result.id,
          facebookAccountId: hook.result.accountId
        };
        let promises = [];
        // Must resolve FB api paging
        if(data.likes && data.likes.data.length) {
          data.likes.data.forEach(like => {
            promises.push(service.create(Object.assign({
              raw: like,
              type: 'like'
            }, defaultItem)));
          });
        }
        if(data.comments && data.comments.data.length) {
          data.comments.data.forEach(comment => {
            promises.push(service.create(Object.assign({
              raw: comment,
              type: 'comment'
            }, defaultItem)));
          });
        }
        return Promise.all(promises).then(() => hook);
      });
    }
    return hook;
  }
}
