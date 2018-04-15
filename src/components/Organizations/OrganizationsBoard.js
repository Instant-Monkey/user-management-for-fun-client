import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

import AddOrganization from './AddOrganization';
import TableDisplayer from '../TableDisplayer';

export default class OrganizationsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationsList: [],
    };
    this.fetchOrganizations = this.fetchOrganizations.bind(this);
    this.addOrganization = this.addOrganization.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }
  componentDidMount() {
    this.fetchOrganizations();
    this.props.setTitle('Organizations');
  }
  fetchOrganizations() {
    fetch(`${process.env.REACT_APP_API_URL}/organizations`)
      .then(res => res.json())
      .then(organizations => this.setState({
        organizationsList: organizations,
      }));
  }
  addOrganization(teamNameValue) {
    return fetch(`${process.env.REACT_APP_API_URL}/organizations/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: teamNameValue,
      }),
    }).then(res => res.json())
      .then((newOrganization) => {
        this.setState((prevState) => {
          const newState = prevState;
          newState.organizationsList.unshift(newOrganization);
          return newState;
        });
        return {
          snackbarOpen: true,
          organizationNameValue: '',
          snackbarMessage: `${newOrganization.properties.name} was sucessfully added`,
        };
      });
  }
  renderTable() {
    if (this.state.organizationsList.length === 0) {
      return null;
    }
    return (
      <div>
        <h1>Organizations</h1>
        <Divider />
        <TableDisplayer data={this.state.organizationsList} url="/organizations/" type="team" />
      </div>
    );
  }
  render() {
    return (
      <div className="user-board-container">
        <AddOrganization addOrganization={this.addOrganization} />
        {this.renderTable()}
      </div>
    );
  }
}
