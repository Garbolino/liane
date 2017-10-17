const parseFacebookData = require('./parseFacebookData');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ parseFacebookData() ],
    update: [ parseFacebookData() ],
    patch: [ parseFacebookData() ],
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
