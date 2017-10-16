const users = require('./users');
const people = require('./people');
const campaigns = require('./campaigns');
const facebookAccounts = require('./facebook/accounts');
const facebookEntries = require('./facebook/entries');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(people);
  app.configure(campaigns);
  app.configure(facebookAccounts);
  app.configure(facebookEntries);
};
