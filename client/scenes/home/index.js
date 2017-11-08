import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hasUser } from 'services/auth';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(228, 208, 104);
  color: #fff;
  button,
  a.button,
  .button {
    background: #fff;
    border: 0;
    color: #333;
  }
  a {
    color: #fff;
    &:hover,
    &:focus,
    &:active {
      color: #333;
    }
  }
`

const BigText = styled.h2`
  font-size: 4em;
  font-family: "Saira Extra Condensed", sans-serif;
`

class Home extends Component {
  render () {
    return (
      <Wrapper id="home" className="content">
        <BigText>An Electoral Toolkit for Activist Campaigns</BigText>
        <p>
          <a className="button" href={`${liane.server}/auth/facebook`}>Start now</a>
        </p>
        <p>
          <a href={`${liane.server}/auth/facebook`}>I already have an account</a>
        </p>
        {hasUser(this.props.auth) &&
          <Redirect to="/dashboard" />
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home);
