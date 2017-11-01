import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findPeople } from 'actions/people';

class AccountPeople extends Component {
  constructor (props) {
    super(props);
    this.queriedPeople = false;
    this.getPeople(props);
  }
  componentWillReceiveProps (nextProps) {
    this.getPeople(nextProps);
  }
  getPeople (props) {
    if(props.auth.signedIn && props.account && !this.queriedPeople) {
      this.props.findPeople({
        query: {
          '$sort': {
            'likeCount': -1
          }
        }
      });
      this.queriedPeople = true;
    }
  }
  render () {
    const { auth, account, people } = this.props;
    if(auth.signedIn && account !== null && people.length) {
      return (
        <section id="account-people">
          <h4>People</h4>
          <table>
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

const getPeople = function (index, obj) {
  let people = [];
  index.forEach(id => {
    if(obj[id])
      people.push(obj[id]);
  })
  return people;
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    account: state.facebookAccount,
    people: getPeople(state.accountPeople, state.people)
  }
};

const mapDispatchToProps = {
  findPeople
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPeople);
