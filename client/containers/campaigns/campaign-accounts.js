import React, { Component } from "react";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { findAccounts } from "actions/facebook";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import moment from "moment";

class CampaignAccounts extends Component {
  constructor(props) {
    super(props);
    this.queriedAccounts = false;
    this.getAccounts(props);
  }
  componentWillReceiveProps(nextProps) {
    this.getAccounts(nextProps);
  }
  getAccounts(props) {
    if (props.auth.signedIn && !this.queriedAccounts) {
      console.log("this.props", this.props);
      console.log("props", props);
      this.props.findAccounts({
        query: {
          campaignId: props.campaignId
        }
      });
      this.queriedAccounts = true;
    }
  }

  render() {
    const { auth, facebookAccounts, campaignId } = this.props;
    if (auth.signedIn && facebookAccounts.length) {
      return (
        <section id="accounts">
          <h4>Facebook accounts</h4>
          <table>
            <thead>
              <tr>
                <th>Facebook Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facebookAccounts.map(account => (
                <tr key={`account-${account.id}`}>
                  <td>{account.facebookId}</td>
                  <td>{account.name}</td>
                  <td>{account.category}</td>
                  <td>
                    <Link
                      to={`/dashboard/campaign/${campaignId}/account/${account.id}`}
                    >
                      Explore
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    } else {
      return <div>Please, add a facebook page to track</div>;
    }
  }
}

const getAccounts = function(campaignId, index, obj) {
  let accounts = [];
  index.forEach(id => {
    if (obj[id]) {
      if (campaignId == obj[id].campaignId) accounts.push(obj[id]);
    }
  });
  return accounts;
};

const mapStateToProps = (state, ownProps) => {
  console.log("state-------", state);
  console.log("ownProps", ownProps);
  return {
    auth: state.auth,
    campaignId: state.campaigns.id,
    facebookAccounts: getAccounts(
      ownProps.campaignId,
      state.campaignAccounts,
      state.facebookAccounts
    )
  };
};

const mapDispatchToProps = {
  findAccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignAccounts);
