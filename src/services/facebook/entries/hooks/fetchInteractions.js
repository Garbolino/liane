const axios = require('axios');

module.exports = function () {

  function wait (milisseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milisseconds);
    });
  };

  async function fetch (FB, token, entry, service) {

    let likes = [];
    let comments = [];

    const likesRes = await FB.api(entry.facebookId + '/likes', {
      limit: 2000,
      access_token: token
    });
    likes = likes.concat(likesRes.data);
    // Likes paging
    if(likesRes.paging) {
      let likesNext = likesRes.paging.next;
      while(likesNext !== undefined) {
        let nextRes = await axios.get(likesNext);
        likesNext = nextRes.data.paging.next;
        likes = likes.concat(nextRes.data.data);
      }
    }

    const commentsRes = await FB.api(entry.facebookId + '/comments', {
      limit: 2000,
      access_token: token
    });
    comments = comments.concat(commentsRes.data);
    // Comments paging
    if(commentsRes.paging) {
      let commentsNext = commentsRes.paging.next;
      while(commentsNext !== undefined) {
        let nextRes = await axios.get(commentsNext);
        commentsNext = nextRes.data.paging.next;
        comments = comments.concat(nextRes.data.data);
      }
    }

    const defaultItem = {
      entryId: entry.id,
      facebookAccountId: entry.accountId,
      origin: 'facebook'
    };

    if(likes.length) {
      for (const like of likes) {
        await service.create(Object.assign({
          raw: like,
          type: 'like'
        }, defaultItem));
      }
    }

    if(comments.length) {
      for(const comment of comments) {
        await service.create(Object.assign({
          raw: comment,
          type: 'comment'
        }, defaultItem));
      }
    }

  };

  return function fetchInteractions (hook) {

    if(hook.params.fbAccessToken) {

      const FB = hook.app.facebook;
      const token = hook.params.fbAccessToken;
      const entry = hook.result;
      const service = hook.app.service('interactions');

      return fetch(FB, token, entry, service).then(() => hook);

    }

    return hook;
  }
}
