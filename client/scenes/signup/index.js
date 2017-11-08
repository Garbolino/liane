import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasUser } from 'services/auth';
import { createCampaign, findCampaigns } from 'actions/campaigns';

class NewCampaign extends Component {
  render () {
    const { campaign } = this.props;
    if(campaign) {
      return <Redirect to="/new/facebook" />
    } else {
      return <NewCampaignForm />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: state.campaign
  }
};

const mapDispatchToProps = {
  findCampaigns
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign);
