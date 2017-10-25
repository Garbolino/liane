const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');

module.exports = function () {
  return function (hook) {
    if(hook.params.provider) {
      const sequelize = hook.app.get('sequelizeClient');
      const association = {
        // attributes: [
        //   'people.name',
        //   [
        //     sequelize.fn('COUNT', sequelize.col('facebookAccounts.id')),
        //     'interactions'
        //   ]
        // ],
        attributes: ['name'],
        include: [
          {
            model: sequelize.models.facebookAccounts,
            as: 'interaction',
            attributes: [
              [
                sequelize.fn('COUNT', sequelize.col('interaction.id')),
                'interactions'
              ]
            ],
            through: {
              attributes: []
            },
            duplicating: false
          }
        ],
        group: ['people.id']
      }
      switch(hook.type) {
        case 'before' :
          if (!hook.params.sequelize) hook.params.sequelize = {};
          Object.assign(hook.params.sequelize, association, { raw: false });
          return hook;
          break;
        case 'after' :
          return hydrate(association)
            .call(this, hook)
            .then(() => {
              return dehydrate().call(this, hook);
            });
          break;
      }
    }
    return hook;
  }
};
