// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const facebookAccounts = sequelizeClient.define('facebookAccounts', {
    facebookId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  facebookAccounts.associate = function(models) {
    facebookAccounts.belongsTo(models.campaigns, {
      foreignKey: 'campaignId'
    });
    facebookAccounts.hasMany(models.facebookLikes);
    facebookAccounts.hasMany(models.facebookComments);
  };
  return facebookAccounts;
};
