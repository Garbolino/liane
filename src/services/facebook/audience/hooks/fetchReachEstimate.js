const omit = require('lodash/omit');
const errors = require('feathers-errors');

module.exports = function () {


  return function fetchReachEstimate (hook) {
    // Currently using app admin user token with its ad account to perform this request
    const FB = hook.app.facebook;
    const { admin, adAccount } = hook.app.get('facebook');
    const accountId = hook.data.facebookAccountId;
    const accountService = hook.app.service('facebookAccounts');
    const userService = hook.app.service('users');

    const route = `act_${adAccount}/reachestimate`;

    let accessToken;

    if(!hook.data.facebookAccountId)
      throw new errors.BadRequest('Missing Facebook Account ID');

    // Get admin user access token
    return userService.find({
      query: {
        facebookId: admin
      }
    }).then(res => {
      if(res.data.length) {
        accessToken = res.data[0].facebookData.accessToken;
      } else {
        throw new errors.GeneralError('Admin user not found');
      }
      // Get account facebook id
      return accountService.get(hook.data.facebookAccountId).then(data => {
        const accountId = data.facebookId;

        // Set targeting spec
        const spec = Object.assign({
          connections: [accountId],
          geo_locations: {
            countries: ["BR"]
          }
        }, hook.data.targetingSpec);

        // Get account total audience
        return FB.api(accountId, {
          fields: [ 'fan_count' ],
          access_token: accessToken
        }).then(res => {

          hook.data.total = res.fan_count;

          // Fetch estimate
          return FB.api(route, {
            targeting_spec: spec,
            access_token: accessToken
          }).then(res => {

            Object.assign(hook.data, {
              estimate: res.data.users,
              targetingSpec: spec
            });

            // Fetch location estimate
            return FB.api(route, {
              targeting_spec: omit(spec, ['connections']),
              access_token: accessToken
            }).then(res => {

              hook.data.location_estimate = res.data.users;

              // Fetch location total
              return FB.api(route, {
                targeting_spec: omit(spec, ['interests', 'connections']),
                access_token: accessToken
              }).then(res => {
                hook.data.location_total = res.data.users;
                return hook;
              });
            });
          });

        });


      });
    });
  }
}
