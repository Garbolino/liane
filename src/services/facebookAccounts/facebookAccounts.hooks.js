const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const { authenticate } = require('feathers-authentication').hooks;

const restrictToCampaign = function () {
  return function(hook) {
    return hook;
  }
}

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
          throw new errors.Forbidden('You must have a campaign to associate a Facebook Account to.')
        }
        return hook;
      });
    }
  }
}

const associateCampaign = function () {
  return function (hook) {
    if(hook.params.provider && hook.params.campaign) {
      hook.result.setCampaign(hook.params.campaign.id);
    }
    return hook;
  };
};

module.exports = {
  before: {
    all: [ populateCampaign(), authenticate('jwt') ],
    find: [],
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
    create: [ hydrate(), associateCampaign(), dehydrate() ],
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
