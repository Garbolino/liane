// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const interactions = sequelizeClient.define('interactions', {
    type: {
      type: DataTypes.ENUM(
        'like',
        'comment',
        'share'
      )
    },
    message: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.ENUM(
        'facebook'
      )
    }
  });
  return interactions;
};
