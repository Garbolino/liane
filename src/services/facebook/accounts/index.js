// Initializes the `facebookAccounts` service on path `/facebookAccounts`
const crypto = require('crypto');
const bodyParser = require('body-parser');
const createService = require('feathers-sequelize');
const createModel = require('./model');
const hooks = require('./hooks');
const filters = require('./filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facebookAccounts',
    Model,
    paginate
  };

  const { clientSecret } = app.get('authentication').facebook;

  // Hub signature verification middleware
  const verifyHubSignature = function (req, res, next) {
    const signature = req.headers['x-hub-signature'];
    if(signature !== undefined && Buffer.isBuffer(req.body)) {
      const hmac = crypto.createHmac('sha1', clientSecret);
      hmac.update(req.body);
      const expectedSignature = 'sha1=' + hmac.digest('hex');
      if(expectedSignature !== signature) {
        res.status(400).send('Invalid signature');
      } else {
        next();
      }
    } else {
      next();
    }
  }

  // Handling subscription data
  app.use('/facebookAccounts/subscriptions', verifyHubSignature, function(req, res) {
    let body = req.body;
    if(Buffer.isBuffer(req.body)) body = JSON.parse(req.body.toString());
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == app.get('fbVerifyToken')) {
      // Authorize subscription
      res.status(200).send(req.query['hub.challenge']);
    } else if(body.object == 'page') {
      // Subscription update
      const service = app.service('facebookEntries');
      const accountService = app.service('facebookAccounts');
      let promises = [];
      body.entry.forEach(entry => {
        const facebookId = entry.id;
        const entryPromise = new Promise((resolve, reject) => {
          accountService.find({ facebookId }).then(res => {
            let entryPromises = [];
            if(res.data.length) {
              const account = res.data[0];
              entry.changes.forEach(item => {
                switch(item.field) {
                  case 'feed':
                  const value = item.value;
                  switch(value.verb) {
                    case 'add':
                      if(value.item == 'comment') {
                        console.log('Comment update');
                      } else {
                        console.log('new entry', value);
                        entryPromises.push(service.create({
                          accountId: account.id,
                          facebookId: value.post_id
                        }, {
                          fbAccessToken: account.accessToken
                        }));
                      }
                      break;
                    case 'remove':
                      break;
                  }
                  break;
                }
              });
            }
            Promise.all(entryPromises).then(resolve).catch(reject);
          });
        });
        promises.push(entryPromise);
      });
      Promise.all(promises).then(() => {
        console.log('finished');
        res.sendStatus(200);
      }).catch(err => {
        res.status(err.code).send(err);
      });
    } else {
      res.sendStatus(400);
    }
  });

  // Initialize our service with any options it requires
  app.use('/facebookAccounts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facebookAccounts');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
