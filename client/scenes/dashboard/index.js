import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import CampaignList from "containers/campaigns/list";

const Wrapper = styled.section``;

class Dashboard extends Component {
  shouldRedirect(auth) {
    return !auth.signing && !hasUser(auth);
  }
  render() {
    return (
      <Wrapper id="dashboard" className="content">
        <CampaignList />
        {this.shouldRedirect(this.props.auth) && <Redirect to="/" />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
