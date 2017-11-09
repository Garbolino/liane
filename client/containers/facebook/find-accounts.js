import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { selectAccount } from "actions/facebook";

const TableWrapper = styled.table`
  width: 100%;
  margin: 0 auto;
`;

class FacebookAccount extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    e.preventDefault();
    const { account, campaignId } = this.props;
    if (confirm("Are you sure you want to add it?")) {
      this.props.selectAccount({
        facebookId: account.id,
        name: account.name,
        campaignId: campaignId,
        category: account.category
      });
    }
  }
  render() {
    const { account } = this.props;
    return (
      <tr>
        <td>{account.id}</td>
        <td>{account.name}</td>
        <td>{account.category}</td>
        <td>
          <a href="javascript:void(0);" onClick={this.handleSelect}>
            Select
          </a>
        </td>
      </tr>
    );
  }
}

class Table extends Component {
  render() {
    const { items, selectAccount, campaignId } = this.props;
    if (Array.isArray(items) && items.length) {
      return (
        <TableWrapper>
          <thead>
            <tr>
              <th># ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <FacebookAccount
                account={item}
                key={i}
                campaignId={campaignId}
                selectAccount={selectAccount}
              />
            ))}
          </tbody>
        </TableWrapper>
      );
    } else {
      return null;
    }
  }
}

class FindFBAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      items: [],
      isLoading: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ searchQuery: value });
  }
  handleSearch(e) {
    e.preventDefault();
    const { searchQuery } = this.state;
    axios.get(`/searchFacebookPages?q=${searchQuery}`).then(res => {
      if (res.data.data) {
        this.setState({
          items: res.data.data
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  }
  render() {
    const { selectAccount, campaignId } = this.props;
    const { searchQuery, isLoading, items } = this.state;
    return (
      <div id="search-accounts">
        <form onSubmit={this.handleSearch}>
          <input
            name="fbname"
            value={searchQuery}
            placeholder="Find by name"
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <Table
          items={items}
          selectAccount={selectAccount}
          campaignId={campaignId}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  selectAccount
};

export default connect(null, mapDispatchToProps)(FindFBAccounts);
