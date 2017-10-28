const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const queue = require('./queue');

const facebook = require('./facebook');
const authentication = require('./authentication');

const postgres = require('./postgres');

const app = feathers();

const env = app.get('env');
const webpackConfig = require(`../config/webpack/${env}`);

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());

// Use json body parser when content is `application/json` type and request headers does not include `x-hub-signature`
app.use(bodyParser.json({
  type: req => req.headers['content-type'] == 'aplication/json' && !req.headers['x-hub-signature']
}));
// Use raw body parser when headers include `x-hub-signature`
app.use(bodyParser.raw({
  type: req => !!req.headers['x-hub-signature']
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(hooks());
app.configure(postgres);
app.configure(rest());
app.configure(socketio());

app.configure(facebook);
app.configure(authentication);

app.configure(queue);

// Set up our services (see `services/index.js`)
app.configure(services);

if(env !== 'production') {
  const history = require('connect-history-api-fallback');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);
  const webpackDev = require('webpack-dev-middleware');
  const hmr = require('webpack-hot-middleware');
  app.use(history()); // pushState
  app.use(webpackDev(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(hmr(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 2000
  }));
} else {
  // Assume that different public and server urls means the public files are being served from somewhere else.
  const url = app.get('url');
  if(typeof url === 'string' || url.public === url.server) {
    app.use(feathers.static(webpackConfig.output.path));
    // Allow pushState
    app.get('/*', function(req, res) {
      res.sendFile(path.join(webpackConfig.output.path, 'index.html'));
    });
  }
}

// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware);

app.hooks(appHooks);

module.exports = app;
