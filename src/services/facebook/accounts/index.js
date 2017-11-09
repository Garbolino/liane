const createService = require("feathers-sequelize");
const createModel = require("./model");
const logger = require("winston");
const hooks = require("./hooks");
const filters = require("./filters");
const middleware = require("./middleware");

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    name: "facebookAccounts",
    Model,
    paginate
  };

  app.configure(middleware);

  // Initialize our service with any options it requires
  app.use("/facebookAccounts", createService(options));

  app.use("/searchFacebookPages", function(req, res) {
    logger.info("searchFacebookPages called", { q: req.query.q });
    const token = app.get("fbAppToken");
    if (req.query.q) {
      app.facebook
        .api("search", {
          type: "page",
          fields: "name,category",
          q: req.query.q.replace(" ", ""),
          access_token: token,
          locale: "en_US"
        })
        .then(function(data) {
          res.send(data);
        })
        .catch(function(err) {
          res.send(err);
        });
    } else {
      res.send({});
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service("facebookAccounts");

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
