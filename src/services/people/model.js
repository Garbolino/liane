// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const people = sequelizeClient.define('people', {
    name: { type: DataTypes.STRING },
    notes: { type: DataTypes.JSON },
    facebookId: { type: DataTypes.STRING },
    facebookData: { type: DataTypes.JSON }
  });
  people.associate = function(models) {
    people.belongsToMany(models.campaigns, {
      through: models.interactions
    });
  };
  return people;
};
