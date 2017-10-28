// Initializes the `people` service on path `/people`
const createService = require('feathers-sequelize');
const createModel = require('./model');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = Object.assign({}, app.get('paginate'), {
    default: 50
  });

  const options = {
    name: 'people',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/people', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('people');

  const patchOrCreatePerson = function(data) {
    return new Promise((resolve, reject) => {
      service.find({
        query: {
          facebookId: data.id
        }
      }).then(res => {
        if(res.data.length) {
          service.patch(res.data[0].id, { facebookData: data })
            .then(resolve).catch(reject);
        } else {
          service.create({ facebookData: data })
            .then(resolve).catch(reject);
        }
      });
    });
  };

  app.jobs.process('people', 20, (job, done) => {
    patchOrCreatePerson(job.data.data).then(person => {
      done(null, person);
    }).catch(done);
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
