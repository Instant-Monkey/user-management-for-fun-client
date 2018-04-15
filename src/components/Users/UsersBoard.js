import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

import AddUser from './AddUser';
import TableDisplayer from '../TableDisplayer';

export default class UsersBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      organizationsList: [],
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchOrganizations = this.fetchOrganizations.bind(this);
    this.addUser = this.addUser.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }
  componentDidMount() {
    this.fetchUsers();
    this.fetchOrganizations();
    this.props.setTitle('Users');
  }
  fetchUsers() {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json())
      .then(users => this.setState({
        usersList: users,
      }));
  }
  fetchOrganizations() {
    fetch(`${process.env.REACT_APP_API_URL}/organizations`)
      .then(res => res.json())
      .then(organizations => this.setState({
        organizationsList: organizations,
      }));
  }
  addUser(userNameValue, userEmailValue, organizationSelectValue) {
    return fetch(`${process.env.REACT_APP_API_URL}/users/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: userNameValue,
        email: userEmailValue,
      }),
    }).then(res => res.json())
      .then((newUser) => {
        this.setState((prevState) => {
          const newState = prevState;
          newState.usersList.unshift(newUser);
          return newState;
        });
        const addUserState = {
          snackbarOpen: true,
          userNameValue: '',
          userEmailValue: '',
          snackbarMessage: `${newUser.properties.name} was sucessfully added`,
        };
        if (organizationSelectValue === 0) {
          return addUserState;
        }
        return fetch(`${process.env.REACT_APP_API_URL}/organizations/${organizationSelectValue}/addUser`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            userId: newUser.identity.low,
          }),
        }).then(res => res.json())
          .then(() => addUserState);
      });
  }
  renderTable() {
    if (this.state.usersList.length === 0) {
      return null;
    }
    return (
      <div>
        <h1>Users</h1>
        <Divider />
        <TableDisplayer data={this.state.usersList} url="/users/" type="user" />
      </div>
    );
  }
  render() {
    return (
      <div className="user-board-container">
        <AddUser addUser={this.addUser} organizationsList={this.state.organizationsList} />
        {this.renderTable()}
      </div>
    );
  }
}
