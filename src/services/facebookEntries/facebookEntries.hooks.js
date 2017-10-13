const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const errors = require('feathers-errors');

const restrict = [
  commonHooks.disallow('external')
];

const associateAccount = function () {
  return function (hook) {
    switch(hook.type) {
      case 'before':
        hook.params.accountFacebookId = hook.data.accountId;
        delete hook.data.accountId;
        return hook;
        break;
      case 'after':
        const service = hook.app.service('facebookAccounts');
        const facebookId = hook.params.accountFacebookId;
        return service.find({facebookId}).then(res => {
          if(res.data.length) {
            const account = res.data[0];
            return hydrate().call(this, hook).then(() => {
              return hook.result.setFacebookAccount(account.id).then(() => {
                return dehydrate().call(this, hook);
              });
            });
          }
        });
        break;
    }
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ ...restrict, associateAccount() ],
    update: [ ...restrict ],
    patch: [ ...restrict ],
    remove: [ ...restrict ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ associateAccount() ],
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
