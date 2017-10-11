const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');

const rawFalse = hook => {
  if(!hook.params.sequelize) hook.params.sequelize = {};
  Object.assign(hook.params.sequelize, { raw: false });
  return hook;
};

const restrictToUsers = function () {
  return function (hook) {
    if(hook.params.provider) {
      const association = {
        include: [
          {
            model: hook.app.service('users').Model,
            where: { id: hook.params.user.id }
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
    } else {
      return hook;
    }
  }
}

const associateOwner = () => hook => {
  const user = hook.params.user;
  hook.result.addUser(user.id, {through: { role: 'owner' }});
  return hook;
};

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      restrictToUsers()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      restrictToUsers(),
      commonHooks.when(
        hook => hook.params.provider,
        [
          commonHooks.discard('users')
        ]
      )
    ],
    find: [],
    get: [],
    create: [ hydrate(), associateOwner(), dehydrate() ],
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
