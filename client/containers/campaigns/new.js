import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasUser } from 'services/auth';
import { createCampaign, findCampaigns } from 'actions/campaigns';

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    };
    const { auth } = this.props;
    this.queriedCampaign = false;
    if(auth.signedIn) {
      this.props.findCampaigns();
      this.queriedCampaign = true;
    }
    this.handleChange = this.handleChange.bind(this);
    this.create = this.create.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.auth.signedIn && !this.queriedCampaign) {
      this.props.findCampaigns();
      this.queriedCampaign = true;
    }
  }
  handleChange (ev) {
    const { formData } = this.state;
    const { target } = ev;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      formData: Object.assign({}, formData, {[target.name]: value})
    });
  }
  create (ev) {
    ev.preventDefault();
    const { createCampaign } = this.props;
    const { formData } = this.state;
    createCampaign(formData);
  }
  render () {
    const { auth, campaign } = this.props;
    if(hasUser(auth)) {
      if(campaign) {
        return (
          <section id="user-campaign">
            <h3>Campaign: {campaign.name}</h3>
          </section>
        )
      } else {
        return (
          <section id="new-campaign">
            <form onSubmit={this.create}>
              <input
                name="name"
                placeholder="Campaign title"
                onChange={this.handleChange}
                />
              <input type="submit" value="Create campaign" />
            </form>
          </section>
        )
      }
    } else {
      return null;
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
  createCampaign,
  findCampaigns
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign);
