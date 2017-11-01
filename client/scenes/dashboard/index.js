import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasUser } from 'services/auth';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import NewCampaign from 'containers/campaigns/new';
import UserFBAccounts from 'containers/facebook/user-accounts';

import Audience from './audience';
import People from './people';

class Dashboard extends Component {
  render () {
    return (
      <section id="dashboard">
        <NewCampaign />
        <UserFBAccounts />
        <Switch>
          <Route path="/dashboard/audience" component={Audience} />
          <Route path="/dashboard/people" component={People} />
        </Switch>
        {!hasUser(this.props.auth) && (
          <Redirect to="/" />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Dashboard);
