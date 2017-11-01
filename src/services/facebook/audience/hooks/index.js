const fetchReachEstimate = require('./fetchReachEstimate');

module.exports = {
  before: {
    all: [
      // hook => {
      //   if(hook.params.provider) {
      //     throw new Error('Not allowed');
      //   }
      //   return hook;
      // }
    ],
    find: [],
    get: [],
    create: [ fetchReachEstimate() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
