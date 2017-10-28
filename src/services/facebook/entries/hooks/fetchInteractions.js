const axios = require('axios');

module.exports = function () {

  async function fetch (app, token, entry) {

    const FB = app.facebook;

    let likes = [];
    let comments = [];
    let people = [];

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
      facebookAccountId: entry.accountId
    };

    if(likes.length) {
      for (const like of likes) {
        people.push(like);
      }
    }

    if(comments.length) {
      for(const comment of comments) {
        people.push(comment.from);
      }
    }

    let peopleMap = {};
    people.map(p => { peopleMap[p.id] = p });
    people = [];
    Object.keys(peopleMap).map(id => { people.push(peopleMap[id]) });

    return { people, likes, comments };

  };

  return function fetchInteractions (hook) {

    if(hook.params.fbAccessToken) {

      const app = hook.app;
      const token = hook.params.fbAccessToken;
      const entry = hook.result;

      const peopleService = hook.app.service('people');
      const likeService = hook.app.service('facebookLikes');
      const commentService = hook.app.service('facebookComments');

      return fetch(app, token, entry).then(data => {
        let peopleJobs = [];
        for(let person of data.people) {
          peopleJobs.push(app.jobs.create('people', {
            title: person.name,
            data: person
          }).save());
        }
        let promises = [];
        for(let job of peopleJobs) {
          promises.push(new Promise(resolve => {
            job.on('complete', person => {
              let likes = data.likes.filter(l => l.id == person.facebookId);
              for(let like of likes) {
                app.jobs.create('like', {
                  title: person.name,
                  data: {
                    personId: person.id,
                    entryId: entry.id,
                    facebookAccountId: entry.accountId
                  }
                }).save();
              }
              let comments = data.comments.filter(c => c.from.id == person.facebookId);
              for(let comment of comments) {
                app.jobs.create('comment', {
                  title: person.name,
                  data: {
                    personId: person.id,
                    entryId: entry.id,
                    facebookAccountId: entry.accountId,
                    facebookId: comment.id,
                    message: comment.message
                  }
                }).save();
              }
              resolve();
            });
          }));
        }
        return Promise.all(promises).then(() => hook);
      });

    }

    return hook;
  }
}
