import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import { hasUser, displayName } from 'services/auth';

const Wrapper = styled.nav`
`;

const NavItem = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
  border-left: 1px solid #ddd;
`;

class Nav extends Component {
  render () {
    const { auth, campaign } = this.props;
    if(hasUser(auth)) {
      return (
        <Wrapper>
          <NavItem>
            Hello, {displayName(auth)}!
          </NavItem>
          <NavItem>
            <Link to="/dashboard/people">People</Link>
          </NavItem>
          <NavItem>
            <Link to="/dashboard/audience">Network reach</Link>
          </NavItem>
          <NavItem>
            <a onClick={this.props.logout}>Logout</a>
          </NavItem>
        </Wrapper>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    campaign: state.campaign
  }
}

const mapDispatchToProps = {
  logout
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
