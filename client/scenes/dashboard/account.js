import React, { Component } from "react";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { loadAccount } from "actions/facebook";

class DashboardAccount extends Component {
  constructor(props) {
    super(props);
    this.queriedAccount = false;
    this.getAccount(props);
    console.log(props);
  }
  componentWillReceiveProps(nextProps) {
    this.getAccount(nextProps);
  }
  getAccount(props) {
    if (props.auth.signedIn && !this.queriedAccount) {
      props.loadAccount(props.match.params.accountId);
      this.queriedAccount = true;
    }
  }
  render() {
    const { campaign, account } = this.props;
    return (
      <section id="account" className="content">
        {account ? <h4>Account: {account.name}</h4> : ""}
      </section>
    );
  }
}

const getCampaign = (campaigns, ownProps) => {
  return campaigns;
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: getCampaign(state.campaigns, ownProps),
    account: state.facebookAccounts
  };
};
const mapDispatchToProps = {
  loadAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAccount);
