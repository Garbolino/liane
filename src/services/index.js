const users = require('./users');
const people = require('./people');
const campaigns = require('./campaigns');
const facebook = require('./facebook');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(people);
  app.configure(campaigns);
  app.configure(facebook);
};
