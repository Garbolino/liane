import React, { Component } from "react";
import { connect } from "react-redux";
import { selectAccount, findAccount } from "actions/facebook";

class UserFBAccounts extends Component {
  constructor(props) {
    super(props);
    this.selectAccount = this.selectAccount.bind(this);
  }
  selectAccount(account) {
    const self = this;
    return function(ev) {
      ev.preventDefault();
      self.props.selectAccount({
        facebookId: account.id,
        name: account.name,
        accessToken: account.access_token,
        category: account.category,
        campaignId: self.props.campaignId
      });
    };
  }
  render() {
    const { auth } = this.props;
    if (auth.signedIn && auth.user.facebookData) {
      const accounts = auth.user.facebookData.accounts.data;
      return (
        <section id="facebook-accounts">
          <ul>
            {accounts.map(account => (
              <li key={`account-${account.id}`}>
                <a
                  href="javascript:void(0);"
                  onClick={this.selectAccount(account)}
                >
                  {account.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  selectAccount,
  findAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFBAccounts);
