// Initializes the `facebookEntries` service on path `/facebookEntries`
const createService = require('feathers-sequelize');
const createModel = require('./model');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facebookEntries',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/facebookEntries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facebookEntries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
