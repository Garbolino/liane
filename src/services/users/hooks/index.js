const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;

const parseFacebookData = require('./parseFacebookData');
const extendFBToken = require('./extendFBToken');

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

module.exports = {
  before: {
    all: [
      // populateCampaign()
      ...restrict
    ],
    find: [ authenticate('jwt') ],
    get: [],
    create: [
      parseFacebookData(),
      extendFBToken(),
      hashPassword()
    ],
    update: [
      ...restrict,
      parseFacebookData(),
      extendFBToken(),
      hashPassword()
    ],
    patch: [
      ...restrict,
      parseFacebookData(),
      extendFBToken(),
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
    get: [
      // hook => {
      //   const FB = hook.app.facebook;
      //   FB.setAccessToken(hook.result.facebookData.accessToken);
      //   return FB.api('me/adaccounts').then(data => {
      //     console.log(data);
      //     return hook;
      //   });
      // }
    ],
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
