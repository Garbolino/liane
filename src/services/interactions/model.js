// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const interactions = sequelizeClient.define('interactions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    facebookId: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM(
        'like',
        'comment'
      )
    },
    message: {
      type: DataTypes.TEXT
    },
    origin: {
      type: DataTypes.ENUM(
        'facebook'
      )
    }
  });
  return interactions;
};
