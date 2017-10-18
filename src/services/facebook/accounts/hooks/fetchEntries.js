const errors = require('feathers-errors');

module.exports = function () {

  function wait (milisseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milisseconds);
    });
  };

  return async function fetchEntries (hook) {

    const FB = hook.app.facebook;
    const service = hook.app.service('facebookEntries');
    const account = hook.result;

    FB.setAccessToken(account.accessToken);

    const res = await FB.api(account.facebookId + '/feed', { fields: [
      'object_id',
      'parent_id',
      'message',
      'link',
      'type',
      'created_time',
      'updated_time'
    ]});

    // Must resolve paging

    FB.setAccessToken('');

    if(res.data.length) {

      for(const entry of res.data) {

        await service.create({
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
          skipFetch: true,
          fbAccessToken: account.accessToken
        });

        await wait(100);

      }

    }

    return hook;

  }
};
