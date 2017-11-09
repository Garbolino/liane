const { authenticate } = require("feathers-authentication").hooks;

const subscribe = require("./subscribe");
const populateCampaign = require("./populateCampaign");
const fetchAudience = require("./fetchAudience");
const fetchEntries = require("./fetchEntries");
const associateCampaign = require("./associateCampaign");
const restrictToCampaign = require("./restrictToCampaign");
const extendFBToken = require("./extendFBToken");

module.exports = {
  before: {
    // all: [populateCampaign(), authenticate("jwt")],
    all: [authenticate("jwt")],
    // find: [restrictToCampaign()],
    get: [],
    // create: [ extendFBToken() ],
    // update: [ extendFBToken() ],
    // patch: [ extendFBToken() ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    // create: [associateCampaign(), subscribe(), fetchAudience(), fetchEntries()],
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
