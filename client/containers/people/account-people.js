import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findPeople } from 'actions/people';

class AccountPeople extends Component {
  constructor (props) {
    super(props);
    this.queriedPeople = false;
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.auth.signedIn && nextProps.account && !this.queriedPeople) {
      this.props.findPeople();
      this.queriedPeople = true;
    }
  }
  render () {
    const { auth, account, people } = this.props;
    if(auth.signedIn && account !== null && people.length) {
      return (
        <section id="account-people">
          <h4>People</h4>
          <table style={{width: '100%'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th># Likes</th>
                <th># Comments</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => (
                <tr key={`person-${person.id}`}>
                  <td>{person.name}</td>
                  <td>{person.likeCount}</td>
                  <td>{person.commentCount}</td>
                  <td>Here goes some notes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )
    } else {
      return null;
    }
  }
}

const getPeople = function (people) {
  return Object.keys(people).map(key => people[key]);
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    account: state.facebookAccount,
    people: getPeople(state.people)
  }
};

const mapDispatchToProps = {
  findPeople
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPeople);
