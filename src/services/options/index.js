const createService = require('feathers-sequelize');
const createModel = require('./model');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'options',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/options', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('options');

  app.jobs.process('like', 20, (job, done) => {
    service.create(job.data.data).then(like => {
      done(null, like);
    }).catch(done);
  });

  service.hooks({
    before: {
      all: [
        hook => {
          if(hook.params.provider) {
            throw new Error('Not allowed');
          }
          return hook;
        },
      ],
      create: []
    }
  });

  service.filter(function (data, connection, hook) {
    return false;
  });
};
