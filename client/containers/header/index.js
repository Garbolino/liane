import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Nav from './nav';

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  h1 {
    flex: 1 1 100%;
  }
  nav {
    flex: 0 0 auto;
  }
`;

class Header extends Component {
  render () {
    const { auth, campaign } = this.props;
    return (
      <Wrapper id="app-header">
        <h1><Link to="/">Liane</Link></h1>
        <Nav />
      </Wrapper>
    );
  }
}


export default Header;
