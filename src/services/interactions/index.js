const createService = require('feathers-sequelize');
const createModel = require('./model');

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

  const peopleService = app.service('people');

  const patchOrCreatePerson = function(data) {
    return new Promise((resolve, reject) => {
      peopleService.find({
        query: {
          facebookId: data.id
        }
      }).then(res => {
        if(res.data.length) {
          peopleService.patch(res.data[0].id, { facebookData: data })
            .then(resolve).catch(reject);
        } else {
          peopleService.create({ facebookData: data })
            .then(resolve).catch(reject);
        }
      });
    });
  };

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
      create: [
        // Handle raw creation
        // Receives `raw`, `type` and `facebookAccountId`
        hook => {
          if(hook.data.raw) {
            const data = hook.data.raw;
            if(hook.data.type == 'like') {
              // Patch or create person
              return patchOrCreatePerson(data).then(person => {
                hook.data.personId = person.id;
                delete hook.data.raw;
                return hook;
              });
            } else if (hook.data.type == 'comment') {
              return patchOrCreatePerson(data.from).then(person => {
                hook.data.personId = person.id;
                hook.data.facebookId = data.id;
                hook.data.message = data.message;
                hook.data.createdAt = new Date(data.created_time);
                delete hook.data.raw;
                return hook;
              });
            }
          }
          return hook;
        }
      ]
    }
  });

  service.filter(function (data, connection, hook) {
    return data;
  });
};
