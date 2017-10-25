// Initializes the `campaigns` service on path `/campaigns`
const createService = require('feathers-sequelize');
const createModel = require('./model');
const createUsersModel = require('./users/model');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const usersModel = createUsersModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'campaigns',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/campaigns', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('campaigns');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
