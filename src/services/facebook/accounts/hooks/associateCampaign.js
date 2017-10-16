const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');

module.exports = function () {
  return function (hook) {
    if(hook.params.provider && hook.params.campaign) {
      return hydrate()
        .call(this, hook)
        .then(() => {
          return hook.result.setCampaign(hook.params.campaign.id)
            .then(() => {
              return dehydrate().call(this, hook);
            });
        });
    }
    return hook;
  };
};
