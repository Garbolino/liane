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
          throw new errors.Forbidden('You must have an active campaign to associate a Facebook Account to.')
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

const subscribe = function () {
  return function (hook) {
    const FB = hook.app.facebook;
    const account = hook.result;
    console.log(account);
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
    create: [ subscribe(), hydrate(), associateCampaign(), dehydrate() ],
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
