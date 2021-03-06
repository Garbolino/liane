const accounts = require('./accounts');
const entries = require('./entries');
const likes = require('./likes');
const comments = require('./comments');
const audience = require('./audience');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(accounts);
  app.configure(entries);
  app.configure(likes);
  app.configure(comments);
  app.configure(audience);
};
