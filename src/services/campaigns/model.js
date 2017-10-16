// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const campaigns = sequelizeClient.define('campaigns', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  campaigns.associate = function(models) {
    campaigns.belongsToMany(models.users, {
      through: models.campaignUsers
    });
    campaigns.belongsToMany(models.people, {
      through: models.interactions
    });
  };
  return campaigns;
};
