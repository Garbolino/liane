import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findAudience } from 'actions/audience';

class AccountAudience extends Component {
  constructor (props) {
    super(props);
    this.queriedAudience = false;
    this.getAudience(props);
  }
  componentWillReceiveProps (nextProps) {
    this.getAudience(nextProps);
  }
  getAudience (props) {
    if(props.auth.signedIn && props.account && !this.queriedAudience) {
      this.props.findAudience({
        query: {
          facebookAccountId: props.account.id,
          '$sort': {
            title: 1
          }
        }
      });
      this.queriedAudience = true;
    }
  }
  formatPercent (num) {
    return ((parseFloat(num)*100).toFixed(2)) + '%';
  }
  render () {
    const { auth, account, audience } = this.props;
    if(auth.signedIn && account !== null && audience.length) {
      return (
        <section id="account-audience">
          <h4>Network reach</h4>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Audience *</th>
                <th>Location audience *</th>
              </tr>
            </thead>
            <tbody>
              {audience.map(item => (
                <tr key={`item-${item.id}`}>
                  <td>{item.title}</td>
                  <td>
                    <strong>{this.formatPercent(item.estimate/item.total)}</strong><br />
                    {item.estimate} / {item.total}
                  </td>
                  <td>
                    <strong>{this.formatPercent(item.location_estimate/item.location_total)}</strong><br />
                    {item.location_estimate} / {item.location_total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>* Values are estimates obtained through Facebook ad campaign estimate reach with curated targeting specs.</p>
        </section>
      )
    } else {
      return null;
    }
  }
}

const getAudience = function (index, obj) {
  let audience = [];
  index.forEach(id => {
    if(obj[id])
      audience.push(obj[id]);
  })
  return audience;
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    account: state.facebookAccount,
    audience: getAudience(state.accountAudience, state.audience)
  }
};

const mapDispatchToProps = {
  findAudience
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAudience);
