import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import CampaignList from "containers/campaigns/list";

import Campaign from "./campaign";
import Account from "./account";

const Wrapper = styled.section``;

class Dashboard extends Component {
  shouldRedirect(auth) {
    return !auth.signing && !hasUser(auth);
  }
  render() {
    return (
      <Wrapper id="dashboard" className="content">
        <CampaignList />
        <Route exact path="/dashboard/campaign/:id" component={Campaign} />
        <Route
          path="/dashboard/campaign/:id/account/:accountId"
          component={Account}
        />
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
