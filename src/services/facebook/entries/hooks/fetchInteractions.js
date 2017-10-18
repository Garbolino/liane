module.exports = function () {

  function wait (milisseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milisseconds);
    });
  };

  return async function fetchInteractions (hook) {

    if(hook.params.fbAccessToken) {

      const FB = hook.app.facebook;
      const id = hook.result.facebookId;
      const service = hook.app.service('interactions');

      const defaultItem = {
        entryId: hook.result.id,
        facebookAccountId: hook.result.accountId,
        origin: 'facebook'
      };

      FB.setAccessToken(hook.params.fbAccessToken);

      const data = await FB.api(id, { fields: [
        'comments',
        'likes'
      ]});

      FB.setAccessToken('');

      // Must resolve FB api paging

      if(data.likes && data.likes.data.length) {
        for (const like of data.likes.data) {
          await service.create(Object.assign({
            raw: like,
            type: 'like'
          }, defaultItem));
          await wait(100);
        }
      }

      if(data.comments && data.comments.data.length) {
        for(const comment of data.comments.data) {
          await service.create(Object.assign({
            raw: comment,
            type: 'comment'
          }, defaultItem));
          await wait(100);
        }
      }

    }

    return hook;
  }
}
