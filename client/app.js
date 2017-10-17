import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import { hasUser, displayName } from 'services/auth';

import NewCampaign from 'containers/campaigns/new';
import UserFBAccounts from 'containers/facebook/user-accounts';
import AccountPeople from 'containers/people/account-people';

class Application extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { auth, campaign } = this.props;
    return (
      <header>
        <h1>Liane</h1>
        {hasUser(auth) ? (
          <p>
            Hello, {displayName(auth)}!
            <button onClick={this.props.logout}>Logout</button>
          </p>
        ) : (
          <a href={`${liane.server}/auth/facebook`}>Authenticate Link</a>
        )}
        <NewCampaign />
        <hr />
        <UserFBAccounts />
        <hr />
        <AccountPeople />
      </header>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: state.campaign
  }
}

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
