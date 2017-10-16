const errors = require('feathers-errors');

module.exports = function () {
  return function (hook) {
    const FB = hook.app.facebook;
    const service = hook.app.service('facebookEntries');
    const account = hook.result;
    FB.setAccessToken(account.accessToken);
    return FB.api(account.facebookId + '/feed', { fields: [
      'object_id',
      'parent_id',
      'message',
      'link',
      'type',
      'created_time',
      'updated_time'
    ]})
      .then(res => {
        FB.setAccessToken('');
        let promises = [];
        if(res.data.length) {
          res.data.forEach(entry => {
            promises.push(service.create({
              accountId: account.id,
              facebookId: entry.id,
              type: entry.type,
              message: entry.message,
              objectId: entry.object_id,
              parentId: entry.parent_id,
              link: entry.link,
              createdAt: entry.created_time,
              updatedAt: entry.updated_time
            }, {
              skipFetch: true
            }));
          });
        }
        return Promise.all(promises).then(() => {
          return hook;
        }).catch(err => {
          throw new errors.GeneralError(err);
        });
      })
      .catch(err => {
        FB.setAccessToken('');
        throw new errors.GeneralError(err);
      })
  }
};
