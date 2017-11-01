import React, { Component } from 'react';

import AccountPeople from 'containers/people/account-people';

class DashboardPeople extends Component {
  render () {
    return (
      <section id="dashboard-people">
        <AccountPeople />
      </section>
    );
  }
}

export default DashboardPeople;
