// Initializes the `interactions` service on path `/interactions`
const createService = require('feathers-sequelize');
const createModel = require('./model');
// const hooks = require('./hooks');
// const filters = require('./filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'interactions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/interactions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('interactions');

  service.hooks({
    before: {
      all: hook => {
        if(hook.params.provider) {
          throw new Error('Not allowed');
        }
        return hook;
      }
    }
  });

  service.filter(function (data, connection, hook) {
    return data;
  });
};
