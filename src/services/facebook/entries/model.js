// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const facebookEntries = sequelizeClient.define('facebookEntries', {
    facebookId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    parentId: {
      type: Sequelize.STRING
    },
    objectId: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.TEXT
    },
    link: {
      type: Sequelize.TEXT
    }
  });
  facebookEntries.associate = function(models) {
    facebookEntries.belongsTo(models.facebookAccounts, {
      foreignKey: 'accountId'
    });
    facebookEntries.hasMany(models.facebookLikes, {
      foreignKey: 'entryId'
    });
    facebookEntries.hasMany(models.facebookComments, {
      foreignKey: 'entryId'
    });
  };
  return facebookEntries;
};
