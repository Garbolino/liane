import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hasUser } from 'services/auth';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

const BigText = styled.h2`
  font-size: 4em;
  font-family: "Saira Extra Condensed", sans-serif;
`

class Home extends Component {
  render () {
    return (
      <section id="home">
        <BigText>Your campaign best friend.</BigText>
        <p>
          <button href={`${liane.server}/auth/facebook`}>Start now</button>
          <a href={`${liane.server}/auth/facebook`}>I already have an account</a>
        </p>
        {hasUser(this.props.auth) &&
          <Redirect to="/dashboard" />
        }
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home);
