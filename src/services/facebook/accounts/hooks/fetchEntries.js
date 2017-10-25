const errors = require('feathers-errors');
const axios = require('axios');

module.exports = function () {

  function wait (milisseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milisseconds);
    });
  };

  async function fetch (FB, account, service) {

    let data = [];

    const res = await FB.api(account.facebookId + '/feed', {
      fields: [
        'object_id',
        'parent_id',
        'message',
        'link',
        'type',
        'created_time',
        'updated_time'
      ],
      limit: 100,
      access_token: account.accessToken
    });

    data = data.concat(res.data);

    let next = res.paging.next;

    while(next !== undefined) {
      let pageRes = await axios.get(next);
      next = pageRes.data.paging.next;
      data = data.concat(pageRes.data.data);
    }

    if(data.length) {

      for(const entry of data) {

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

      }

    }

  };

  return function fetchEntries (hook) {

    const FB = hook.app.facebook;
    const service = hook.app.service('facebookEntries');
    const account = hook.result;

    return fetch(FB, account, service).then(() => hook);

  }
};
