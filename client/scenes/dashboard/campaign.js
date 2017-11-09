import React, { Component } from "react";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { loadCampaign } from "actions/campaigns";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import Campaign from "containers/campaigns/campaign";

// import Audience from "./audience";
// import People from "./people";

class DashboardCampaign extends Component {
  constructor(props) {
    super(props);
    this.queriedCampaign = false;
    this.getCampaign(props);
  }
  componentWillReceiveProps(nextProps) {
    this.getCampaign(nextProps);
  }
  getCampaign(props) {
    if (props.auth.signedIn && !this.queriedCampaign) {
      props.loadCampaign(props.match.params.id);
      this.queriedCampaign = true;
    }
  }
  render() {
    const { campaign } = this.props;
    return (
      <div>
        <Campaign campaign={campaign} />
      </div>
    );
  }
}

const getCampaign = (campaigns, ownProps) => {
  return campaigns;
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: getCampaign(state.campaigns, ownProps)
  };
};
const mapDispatchToProps = {
  loadCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCampaign);
