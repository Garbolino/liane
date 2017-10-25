const subscription = require('./subscription');
const audience = require('./audience');

module.exports = function( ) {
  const app = this;
  app.configure(subscription);
  app.configure(audience);
}
