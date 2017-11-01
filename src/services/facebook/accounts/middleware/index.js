const subscription = require('./subscription');

module.exports = function( ) {
  const app = this;
  app.configure(subscription);
}
