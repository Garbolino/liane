const createService = require('feathers-sequelize');
const createModel = require('./model');
const hooks = require('./hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facebookAudience',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/facebookAudience', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facebookAudience');

  app.jobs.process('audience', 20, (job, done) => {
    service.create(job.data.data).then(audience => {
      done(null, audience);
    }).catch(done);
  });

  service.hooks(hooks);

  service.filter(function (data, connection, hook) {
    return data;
  });
};
