module.exports = function () {
  return function (hook) {
    if(hook.params.skipFetch)
      return hook;
    if(hook.params.fbAccessToken) {
      const FB = hook.app.facebook;
      const id = hook.data.facebookId;
      FB.setAccessToken(hook.params.fbAccessToken);
      return FB.api(id, { fields: [
        'object_id',
        'parent_id',
        'message',
        'link',
        'type',
        'created_time',
        'updated_time'
      ]}).then(data => {
        hook.data = {
          accountId: hook.data.accountId,
          facebookId: data.id,
          type: data.type,
          message: data.message,
          objectId: data.object_id,
          parentId: data.parent_id,
          link: data.link,
          createdAt: new Date(data.created_time),
          updatedAt: new Date(data.updated_time)
        };
        return hook;
      });
    }
    return hook;
  }
}
