const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const { populate, discard } = require('feathers-hooks-common');

const parseFacebookData = require('./parseFacebookData');
const populateInteractions = require('./populateInteractions');

module.exports = {
  before: {
    all: [],
    find: [
      populateInteractions()
    ],
    get: [],
    create: [ parseFacebookData() ],
    update: [ parseFacebookData() ],
    patch: [ parseFacebookData() ],
    remove: []
  },

  after: {
    all: [],
    find: [
      populateInteractions()
    ],
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
