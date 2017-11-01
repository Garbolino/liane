// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const facebookAudience = sequelizeClient.define('facebookAudience', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estimate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    location_estimate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    location_total: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    targetingSpec: {
      type: Sequelize.JSON,
      allowNull: false
    },
    monitor: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  facebookAudience.associate = function(models) {
    facebookAudience.belongsTo(models.facebookAccounts);
  };
  return facebookAudience;
};
