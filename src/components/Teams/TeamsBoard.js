import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

import AddTeam from './AddTeam';
import TableDisplayer from '../TableDisplayer';

export default class TeamsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamsList: [],
    };
    this.fetchTeams = this.fetchTeams.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }
  componentDidMount() {
    this.fetchTeams();
  }
  fetchTeams() {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
      .then(res => res.json())
      .then(teams => this.setState({
        teamsList: teams,
      }));
  }
  addTeam(teamNameValue) {
    return fetch(`${process.env.REACT_APP_API_URL}/teams/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: teamNameValue,
      }),
    }).then(res => res.json())
      .then((newTeam) => {
        this.setState((prevState) => {
          const newState = prevState;
          newState.teamsList.unshift(newTeam);
          return newState;
        });
        return {
          snackbarOpen: true,
          teamNameValue: '',
          snackbarMessage: `${newTeam.properties.name} was sucessfully added`,
        };
      });
  }
  renderTable() {
    if (this.state.teamsList.length === 0) {
      return null;
    }
    return (
      <div>
        <h1>{this.props.title}</h1>
        <Divider />
        <TableDisplayer type="team" data={this.state.teamsList} url="/teams/"/>
      </div>
    );
  }
  render() {
    return (
      <div className="user-board-container">
        {this.props.showAdd ? <AddTeam addTeam={this.addTeam} /> : null}
        {this.renderTable()}
      </div>
    );
  }
}

TeamsBoard.defaultProps = {
  showAdd: true,
  title: 'Teams',
};
