import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import UserFBAccounts from "containers/facebook/user-accounts";
import FindFBAccounts from "containers/facebook/find-accounts";

class AddAccountToCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    const { campaignId } = this.props;
    const { showForm } = this.state;

    return (
      <div>
        {showForm ? (
          <div>
            <h5>Your Facebook pages</h5>
            <UserFBAccounts campaignId={campaignId} />
            <h5>Find Facebook pages</h5>
            <FindFBAccounts campaignId={campaignId} />
            <br />
            <button onClick={this.handleClick}>Cancel</button>
          </div>
        ) : (
          <div>
            <button onClick={this.handleClick}>Add Facebook Page</button>
          </div>
        )}
      </div>
    );
  }
}

export default AddAccountToCampaign;
