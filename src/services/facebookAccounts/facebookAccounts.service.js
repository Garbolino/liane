// Initializes the `facebookAccounts` service on path `/facebookAccounts`
const crypto = require('crypto');
const bodyParser = require('body-parser');
const createService = require('feathers-sequelize');
const createModel = require('../../models/facebookAccounts.model');
const hooks = require('./facebookAccounts.hooks');
const filters = require('./facebookAccounts.filters');

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
      let promises = [];
      body.entry.forEach(entry => {
        const accountId = entry.id;
        entry.changes.forEach(item => {
          if(item.field == 'feed') {
            const value = item.value;
            if(value.item == 'comment') {
              console.log('Comment update');
            } else {
              promises.push(service.create({
                accountId,
                facebookId: value.post_id,
                type: value.item,
                message: value.message,
                link: value.link,
                mediaId: value[`${value.item}_id`]
              }));
            }
          }
        });
      });
      Promise.all(promises).then(() => {
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
