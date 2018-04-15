import React, { Component } from 'react';
import TeamsBoard from '../Teams/TeamsBoard.js';

export default class User extends Component {
  displayName() {
    if (this.props.data.properties) {
      return this.props.data.properties.name;
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
    this.displayOrganization = this.displayOrganization.bind(this);
    this.displayName = this.displayName.bind(this);
    this.getTeams = this.getTeams.bind(this);
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/users/${this.props.match.params.id}/groups`)
      .then(res => res.json())
      .then(fetched => this.setState({
        groups: fetched,
      }));
  }
  getTeams() {
    if (this.state.groups.length > 0) {
      const teams = this.state.groups.filter(orga => orga.labels[0] === 'Teams');
      if (teams.length === 0) {
        return null;
      }
      return teams;
    }
    return null;
  }
  displayOrganization() {
    if (this.state.groups.length > 0) {
      const organization = this.state.groups.find(orga => orga.labels[0] === 'Organization');
      if (typeof organization === 'undefined') {
        return '';
      }
      return `from : ${organization.properties.name}`;
    }
    return '';
  }

  render() {
    return (
      <div>
        <h1>{`User : ${this.displayName()} ${this.displayOrganization()}`}</h1>
      </div>
    );
  }
}
