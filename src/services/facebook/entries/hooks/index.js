const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;

const fetch = require('./fetch');
const fetchInteractions = require('./fetchInteractions');
const associateAccount = require('./associateAccount');

const restrict = [
  commonHooks.disallow('external')
];

module.exports = {
  before: {
    all: [ ...restrict ],
    find: [],
    get: [],
    create: [ fetch() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ associateAccount(), fetchInteractions() ],
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
