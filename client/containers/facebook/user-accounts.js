import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAccount, findAccount } from 'actions/facebook';

class UserFBAccounts extends Component {
  constructor (props) {
    super(props);
    this.queriedAccount = false;
    this.selectAccount = this.selectAccount.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.auth.signedIn && !this.queriedAccount) {
      this.props.findAccount();
      this.queriedAccount = true;
    }
  }
  selectAccount(account) {
    const self = this;
    return function (ev) {
      ev.preventDefault();
      self.props.selectAccount({
        facebookId: account.id,
        name: account.name,
        accessToken: account.access_token,
        category: account.category
      });
    }
  }
  render () {
    const { auth, campaign, account } = this.props;
    if(auth.signedIn && account) {
      return (
        <section id="campaign-account">
          <h3>Facebook Account: {account.name}</h3>
        </section>
      )
    } else if(auth.signedIn && campaign !== null && auth.user.facebookData) {
      const accounts = auth.user.facebookData.accounts.data;
      console.log(accounts);
      return (
        <section id="facebook-accounts">
          <h3>Facebook Accounts</h3>
          <p>Select a Facebook Account for your campaign.</p>
          <ul>
            {accounts.map(account => (
              <li key={`account-${account.id}`}>
                <a
                  href="javascript:void(0);"
                  onClick={this.selectAccount(account)}>
                    {account.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: state.campaign,
    account: state.facebookAccount
  }
};

const mapDispatchToProps = {
  selectAccount,
  findAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFBAccounts);
