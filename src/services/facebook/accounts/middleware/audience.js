module.exports = function () {

  const app = this;
  const FB = app.facebook;

  app.use('/facebookAccounts/audience', (req, res, next) => {
    res.send(JSON.parse(req.query.targeting_spec));
  });

};
