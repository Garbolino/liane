const errors = require('feathers-errors');

module.exports = function () {
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
