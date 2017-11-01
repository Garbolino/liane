import React, { Component } from 'react';

import AccountAudience from 'containers/audience/account-audience';

class DashboardPeople extends Component {
  render () {
    return (
      <section id="dashboard-audience">
        <AccountAudience />
      </section>
    );
  }
}

export default DashboardPeople;
