// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const comments = sequelizeClient.define('facebookComments', {
    facebookId: {
      type: DataTypes.STRING,
      unique: true
    },
    message: {
      type: DataTypes.TEXT
    }
  });
  comments.associate = function(models) {
    // comments.belongsTo(models.people);
    // comments.belongsTo(models.entry);
    // comments.belongsTo(models.facebookAccount);
  }
  return comments;
};
