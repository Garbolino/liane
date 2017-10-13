const users = require('./users/users.service.js');
const campaigns = require('./campaigns/campaigns.service.js');
const facebookAccounts = require('./facebookAccounts/facebookAccounts.service.js');
const facebookEntries = require('./facebookEntries/facebookEntries.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(campaigns);
  app.configure(facebookAccounts);
  app.configure(facebookEntries);
};
