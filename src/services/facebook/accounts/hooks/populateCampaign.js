const errors = require('feathers-errors');

module.exports = function () {
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
          throw new errors.Forbidden('You don\'t have an active campaign.')
        }
        return hook;
      });
    }
  }
};
