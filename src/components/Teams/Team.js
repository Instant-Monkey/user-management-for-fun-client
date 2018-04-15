import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TableUserTeam from './TableUserTeam';

const buttonStyle = {
  margin: 12,
};

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      usersListSelected: [],
      usersListSelectedRow: [],
      usersFromTeam: [],
      usersFromTeamSelected: [],
      usersFromTeamSelectedRow: [],
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.usersListOnSelectedRow = this.usersListOnSelectedRow.bind(this);
    this.usersFromTeamOnSelectedRow = this.usersFromTeamOnSelectedRow.bind(this);
    this.manageTeam = this.manageTeam.bind(this);
  }
  componentDidMount() {
    this.fetchUsers();
  }
  usersListOnSelectedRow(usersListSelectedRow) {
    const selectedObjects = usersListSelectedRow === 'all' ?
      this.state.usersList :
      this.state.usersList.filter((el, i) => usersListSelectedRow.indexOf(i) >= 0);
    this.setState({
      usersListSelected: selectedObjects,
      usersListSelectedRow,
    });
  }
  usersFromTeamOnSelectedRow(usersFromTeamSelectedRow) {
    const selectedObjects = usersFromTeamSelectedRow === 'all' ?
      this.state.usersFromTeam :
      this.state.usersFromTeam.filter((el, i) => usersFromTeamSelectedRow.indexOf(i) >= 0);
    this.setState({
      usersFromTeamSelected: selectedObjects,
      usersFromTeamSelectedRow,
    });
  }

  fetchUsers() {
    const allUsers = fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json());
    const AllUsersFromTeam = fetch(`${process.env.REACT_APP_API_URL}/teams/${this.props.match.params.id}/users`)
      .then(res => res.json());
    Promise.all([allUsers, AllUsersFromTeam]).then((values) => {
      const unfilteredUsersList = values[0];
      const usersFromTeam = values[1];
      const usersList = unfilteredUsersList.filter(e => (
        usersFromTeam.findIndex(teamuser => teamuser.identity.low === e.identity.low) === -1
      ));
      this.setState({
        usersList,
        usersFromTeam,
      });
    });
  }
  manageTeam(action) {
    const promises = [];
    let source = [];
    if (action === 'addUser') {
      source = this.state.usersListSelected;
    } else if (action === 'removeUser') {
      source = this.state.usersFromTeamSelected;
    }
    source.forEach(user => (
      promises.push(fetch(`${process.env.REACT_APP_API_URL}/teams/${this.props.match.params.id}/${action}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.identity.low,
        }),
      }).then(res => res.json()))
    ));

    Promise.all(promises).then(() => {
      this.setState({
        usersListSelected: [],
        usersListSelectedRow: [],
        usersFromTeamSelected: [],
        usersFromTeamSelectedRow: [],
      });
      return this.fetchUsers();
    });
  }
  render() {
    return (
      <div>
        <h1>{`This is the team ${this.props.data.properties ? this.props.data.properties.name : ''}`}</h1>
        <div className="user-table-management-team-wrapper">
          <div className="user-table-management-team">
            <h2>Current users</h2>
            <RaisedButton
              label="Remove from the team"
              primary
              disabled={this.state.usersFromTeamSelected.length === 0}
              style={buttonStyle}
              onClick={() => this.manageTeam('removeUser')}
            />
            <TableUserTeam
              data={this.state.usersFromTeam}
              onSelectedRow={this.usersFromTeamOnSelectedRow}
              selectedRows={this.state.usersFromTeamSelectedRow}
            />
          </div>
          <div className="user-table-management-team">
            <h2>Users not in the team </h2>
            <RaisedButton
              label="Add to the team"
              primary
              disabled={this.state.usersListSelected.length === 0}
              style={buttonStyle}
              onClick={() => this.manageTeam('addUser')}
            />
            <TableUserTeam
              data={this.state.usersList}
              onSelectedRow={this.usersListOnSelectedRow}
              selectedRows={this.state.usersListSelectedRow}
            />
          </div>
        </div>
      </div>
    );
  }
}
