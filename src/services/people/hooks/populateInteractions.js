const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const utils = require('feathers-sequelize/lib/utils');

module.exports = function () {
  return function (hook) {
    if(hook.params.provider) {
      const sequelize = hook.app.get('sequelizeClient');
      let order = [[sequelize.col('likeCount'), 'DESC']];
      if(hook.params.query && hook.params.query['$sort']) {
        let sort = hook.params.query['$sort'];
        order = [];
        Object.keys(sort).forEach(name => {
          let attr = name;
          if(name == 'commentCount' || name == 'likeCount')
            attr = sequelize.col(name);
          order.push([attr, parseInt(sort[name], 10) === 1 ? 'ASC' : 'DESC']);
        });
      }
      const sql = {
        attributes: [
          'id',
          'name',
          [
            sequelize.fn('COUNT',
              sequelize.fn('DISTINCT', sequelize.col('facebookLikes.id'))
            ),
            'likeCount'
          ],
          [
            sequelize.fn('COUNT',
              sequelize.fn('DISTINCT', sequelize.col('facebookComments.id'))
            ),
            'commentCount'
          ]
        ],
        order: order,
        include: [
          {
            model: sequelize.models.facebookLikes,
            attributes: [],
            duplicating: false
          },
          {
            model: sequelize.models.facebookComments,
            attributes: [],
            duplicating: false
          }
        ],
        group: ['people.id']
      }
      switch(hook.type) {
        case 'before' :
          if (!hook.params.sequelize) hook.params.sequelize = {};
          Object.assign(hook.params.sequelize, sql, { raw: false });
          return hook;
          break;
        case 'after' :
          return hydrate(sql)
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
