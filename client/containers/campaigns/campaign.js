import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import AddAccountToCampaign from "containers/campaigns/add-account-to-campaign";
import CampaignAccounts from "containers/campaigns/campaign-accounts";

class Campaign extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { campaign } = this.props;
    if (campaign) {
      return (
        <section id="campaign" className="content">
          <h4>Campaign: {campaign.name}</h4>
          <CampaignAccounts campaignId={campaign.id} />
          <AddAccountToCampaign campaignId={campaign.id} />
        </section>
      );
    } else {
      return null;
    }
  }
}

export default Campaign;
