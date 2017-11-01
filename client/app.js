import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import { hasUser, displayName } from 'services/auth';

import NewCampaign from 'containers/campaigns/new';
import UserFBAccounts from 'containers/facebook/user-accounts';
import AccountAudience from 'containers/audience/account-audience';
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
          <p className="row">
            <span className="u-pull-left">
              Hello, {displayName(auth)}!
            </span>
            <span className="u-pull-right">
              <button onClick={this.props.logout}>Logout</button>
            </span>
          </p>
        ) : (
          <a href={`${liane.server}/auth/facebook`}>Authenticate Link</a>
        )}
        <NewCampaign />
        <hr />
        <UserFBAccounts />
        <hr />
        <AccountAudience />
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
