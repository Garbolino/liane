const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const errors = require('feathers-errors');
const { authenticate } = require('feathers-authentication').hooks;

const populateCampaign = function () {
  return function (hook) {
    if(hook.params.provider) {
      const user = hook.params.user;
      return hook.app.service('campaigns').find({
        sequelize: {
          include: [
            {
              model: hook.app.service('users').Model,
              where: { id: user.id }
            }
          ]
        }
      }).then(res => {
        if(res.data.length) {
          hook.params.campaign = res.data[0];
        } else {
          throw new errors.Forbidden('You don\'t have an active campaign.')
        }
        return hook;
      });
    }
  }
};

const restrictToCampaign = function () {
  return function(hook) {
    if(hook.params.provider) {
      if(!hook.params.campaign) {
        throw new errors.BadRequest('You don\'t have an active campaign.');
      }
      hook.params.query.campaignId = hook.params.campaign.id;
    }
    return hook;
  }
};

const associateCampaign = function () {
  return function (hook) {
    if(hook.params.provider && hook.params.campaign) {
      hook.result.setCampaign(hook.params.campaign.id);
    }
    return hook;
  };
};

const fetchEntries = function () {
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
              accountId: account.facebookId,
              facebookId: entry.id,
              type: entry.type,
              message: entry.message,
              objectId: entry.object_id,
              parentId: entry.parent_id,
              link: entry.link
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
}

const subscribe = function () {
  return function (hook) {
    const FB = hook.app.facebook;
    const account = hook.result;
    FB.setAccessToken(account.accessToken);
    return FB.api(account.facebookId + '/subscribed_apps', 'post')
      .then(res => {
        FB.setAccessToken('');
        return hook;
      })
      .catch(err => {
        FB.setAccessToken('');
        throw new errors.GeneralError(err);
      });
  }
}

module.exports = {
  before: {
    all: [ populateCampaign(), authenticate('jwt') ],
    find: [ restrictToCampaign() ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ fetchEntries(), subscribe(), hydrate(), associateCampaign(), dehydrate() ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
