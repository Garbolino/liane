const hydrate = require('feathers-sequelize/hooks/hydrate');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const { populate, discard } = require('feathers-hooks-common');

const parseFacebookData = require('./parseFacebookData');
const populateInteractions = require('./populateInteractions');

const userInteractionsSchema = {
  include: {
    service: 'interactions',
    nameAs: 'interactions',
    select: (hook, parent) => ({ personId: parent.id }),
    paginate: true,
    asArray: true,
    provider: undefined
  }
};

const countInteractions = function (type) {
  const count = object => {
    return object.filter(item => item.type == type).length;
  }
  return function(hook) {
    if(hook.type == 'after') {
      if(hook.method == 'find' && hook.result.data.length) {
        for(let item of hook.result.data) {
          item[type + 'Count'] = count(item.interactions);
        }
      } else {
        if(hook.result.interactions && hook.result.interactions.length) {
          hook.result[type + 'Count'] = count(hook.result.interactions);
        }
      }
    }
    return hook;
  }
}

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
      populateInteractions(),
      // populate({ schema: userInteractionsSchema }),
      // countInteractions('comment'),
      // countInteractions('like'),
      // discard('interactions')
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
