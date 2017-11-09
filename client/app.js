import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { hasUser } from "services/auth";
import { logout } from "actions/auth";
import { withRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import Header from "containers/header";

import Home from "scenes/home";
import Dashboard from "scenes/dashboard";
import Campaign from "scenes/dashboard/campaign";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  #app-header {
    flex: 0 0 auto;
    padding: 0 5vw;
  }
  .content {
    flex: 1 1 100%;
    overflow: auto;
    padding: 0 5vw;
  }
`;

class Application extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default withRouter(connect(mapStateToProps)(Application));
