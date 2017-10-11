// Initializes the `facebookAccounts` service on path `/facebookAccounts`
const createService = require('feathers-sequelize');
const createModel = require('../../models/facebookAccounts.model');
const hooks = require('./facebookAccounts.hooks');
const filters = require('./facebookAccounts.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facebookAccounts',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/facebookAccounts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facebookAccounts');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
