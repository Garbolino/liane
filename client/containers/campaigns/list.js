import React, { Component } from "react";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import NewCampaign from "containers/campaigns/new";
import { findCampaigns } from "actions/campaigns";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import moment from "moment";

class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.queriedCampaigns = false;
    this.getCampaigns(props);
  }
  componentWillReceiveProps(nextProps) {
    this.getCampaigns(nextProps);
  }
  getCampaigns(props) {
    if (props.auth.signedIn && !this.queriedCampaigns) {
      this.props.findCampaigns({
        query: {
          $sort: {
            createdAt: -1
          }
        }
      });
      this.queriedCampaigns = true;
    }
  }

  render() {
    const { auth, campaigns } = this.props;
    if (auth.signedIn && campaigns.length) {
      return (
        <section id="campaigns">
          <h4>Campaigns</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={`campaign-${campaign.id}`}>
                  <td>
                    <Link to={`/dashboard/campaign/${campaign.id}`}>
                      {campaign.name}
                    </Link>
                  </td>
                  <td>{campaign.description}</td>
                  <td>{moment(campaign.createdAt).format("LL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <NewCampaign />
        </section>
      );
    } else {
      return null;
    }
  }
}

const getCampaigns = function(index, obj) {
  let campaigns = [];
  index.forEach(id => {
    if (obj[id]) campaigns.push(obj[id]);
  });
  return campaigns;
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaigns: getCampaigns(state.accountCampaigns, state.campaigns)
  };
};

const mapDispatchToProps = {
  findCampaigns
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
