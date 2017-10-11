// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const campaignUsers = sequelizeClient.define('campaignUsers', {
    role: {
      type: DataTypes.ENUM(
        'owner',
        'manager'
      ),
      allowNull: false
    }
  });
  // campaignUsers.sync({
  //   force: true
  // });
  return campaignUsers;
};
