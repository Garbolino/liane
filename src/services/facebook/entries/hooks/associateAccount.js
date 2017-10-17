const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const errors = require('feathers-errors');

module.exports = function () {
  return function (hook) {
    switch(hook.type) {
      case 'before':
        // hook.params.accountFacebookId = hook.data.accountId;
        // delete hook.data.accountId;
        return hook;
        break;
      case 'after':
        if(hook.params.accountFacebookId) {
          const service = hook.app.service('facebookAccounts');
          const facebookId = hook.params.accountFacebookId;
          return service.find({query: { facebookId }}).then(res => {
            if(res.data.length) {
              const account = res.data[0];
              return hydrate().call(this, hook).then(() => {
                return hook.result.setFacebookAccount(account.id).then(() => {
                  return dehydrate().call(this, hook);
                });
              });
            }
          }).catch(err => {
            throw new errors.GeneralError(err);
          });
        }
        return hook;
        break;
    }
  }
};
