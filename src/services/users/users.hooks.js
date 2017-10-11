const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: 'id',
    ownerField: 'id'
  })
];

const populateCampaign = function () {
  return function (hook) {
    const model = hook.app.service('campaigns').Model;
    const association = {
      include: [
        {
          model: model,
          through: {
            as: 'user',
            attributes: ['role']
          }
        }
      ]
    };
    switch (hook.type) {
      case 'before':
        if (!hook.params.sequelize) hook.params.sequelize = {};
        Object.assign(hook.params.sequelize, association, { raw: false });
        return hook;
        break;
      case 'after':
        return hydrate(association)
          .call(this, hook)
          .then(() => {
            return dehydrate().call(this, hook);
          });
        break;
    }
  };
};

const storeFacebookData = hook => {
  const service = hook.app.service('users');
  const facebookData = hook.data.facebook;
  if(facebookData !== undefined) {
    hook.data.facebookData = {
      ...hook.data.facebook.profile._json,
      accessToken: hook.data.facebook.accessToken
    };
    if(!hook.data.email) {
      return service.find({
        facebookId: facebookData.profile.id
      }).then(res => {
        if(res.data.length) {
          const user = res.data[0];
          if(!user.email) {
            hook.data.email = hook.data.facebookData.email;
          }
        } else {
          hook.data.email = hook.data.facebookData.email;
        }
        return hook;
      });
    }
  } else {
    return hook;
  }
};


module.exports = {
  before: {
    all: [
      // populateCampaign()
    ],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [
      storeFacebookData,
      hashPassword()
    ],
    update: [
      ...restrict,
      storeFacebookData,
      hashPassword()
    ],
    patch: [
      ...restrict,
      storeFacebookData,
      hashPassword()
    ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      // populateCampaign(),
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
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
