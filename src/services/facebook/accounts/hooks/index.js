const { authenticate } = require('feathers-authentication').hooks;

const subscribe = require('./subscribe');
const populateCampaign = require('./populateCampaign');
const fetchEntries = require('./fetchEntries');
const associateCampaign = require('./associateCampaign');
const restrictToCampaign = require('./restrictToCampaign');
const extendFBToken = require('./extendFBToken');

module.exports = {
  before: {
    all: [ populateCampaign(), authenticate('jwt') ],
    find: [ restrictToCampaign() ],
    get: [],
    create: [ extendFBToken() ],
    update: [ extendFBToken() ],
    patch: [ extendFBToken() ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ fetchEntries(), subscribe(), associateCampaign() ],
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
