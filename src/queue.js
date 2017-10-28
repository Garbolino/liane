const kue = require('kue');
const auth = require('feathers-authentication');

module.exports = function (options) {
  const app = this;

  options = Object.assign({
    redis: app.get('redis')
  }, options);

  const jobs = app.jobs = kue.createQueue(options);

  const authConfig = app.get('authentication');
  // console.log(authConfig.cookie);
  // app.use('/queue', auth.express.authenticate('jwt'), kue.app);
  app.use('/queue', kue.app);

}
