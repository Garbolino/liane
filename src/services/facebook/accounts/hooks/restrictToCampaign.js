const errors = require("feathers-errors");

module.exports = function() {
  return function(hook) {
    if (hook.params.provider) {
      const association = {
        include: [
          {
            model: hook.app.service("campaigns").Model,
            where: { campaignId: hook.params.campaignId }
          }
        ]
      };
      switch (hook.type) {
        case "before":
          if (!hook.params.sequelize) hook.params.sequelize = {};
          Object.assign(hook.params.sequelize, association, { raw: false });
          return hook;
          break;
        case "after":
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
  };
};
