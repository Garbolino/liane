import React, { Component } from "react";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { createCampaign } from "actions/campaigns";

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      showForm: false
    };
    const { auth } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.create = this.create.bind(this);
  }
  handleOnClick(e) {
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  }
  handleChange(ev) {
    const { formData } = this.state;
    const { target } = ev;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      formData: Object.assign({}, formData, { [target.name]: value })
    });
  }
  create(ev) {
    ev.preventDefault();
    const { createCampaign } = this.props;
    const { formData } = this.state;
    createCampaign(formData);
  }
  render() {
    const { auth, campaign } = this.props;
    const { showForm } = this.state;
    return (
      <section id="new-campaign">
        {showForm ? (
          <form onSubmit={this.create}>
            <input
              name="name"
              placeholder="Campaign title"
              onChange={this.handleChange}
            />
            <br />
            <input
              name="description"
              placeholder="Campaign description"
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="Submit" />
            <button onClick={this.handleOnClick}>Cancel</button>
          </form>
        ) : (
          <button onClick={this.handleOnClick}>Create campaign</button>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: state.campaign
  };
};

const mapDispatchToProps = {
  createCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign);
