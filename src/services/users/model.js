// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // role: {
    //   type: DataTypes.ENUM('admin', 'editor', 'campaigner')
    // },
    facebookId: { type: DataTypes.STRING, unique: true },
    facebookData: { type: DataTypes.JSON }
  });
  users.associate = function(models) {
    users.belongsToMany(models.campaigns, {
      through: models.campaignUsers
    });
  };
  return users;
};
