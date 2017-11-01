// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const options = sequelizeClient.define('options', {
    name: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.TEXT
    }
  });
  return options;
};
