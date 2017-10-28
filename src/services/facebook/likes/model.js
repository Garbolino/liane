// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const likes = sequelizeClient.define('facebookLikes', {});
  likes.associate = function(models) {
    // likes.belongsTo(models.people);
    // likes.belongsTo(models.entry);
    // likes.belongsTo(models.facebookAccount);
  }
  return likes;
};
