import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import AddUser from './AddUser';
import TableDisplayer from '../TableDisplayer';

export default class UsersBoard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      usersList: []
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  componentDidMount() {
    this.fetchUsers();
  }
  fetchUsers() {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json())
      .then(users => this.setState({
        usersList: users,
      }));
  }
  addUser(userNameValue, userEmailValue) {
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
        return {
          snackbarOpen: true,
          userNameValue: '',
          userEmailValue: '',
          snackbarMessage: `${newUser.properties.name} was sucessfully added`,
        };
      });
  }

  render() {
    return (
      <div className="user-board-container">
        <AddUser addUser={this.addUser} />
        <h1>Users</h1>
        <Divider />
        <TableDisplayer data={this.state.usersList} />
      </div>
    );
  }
}
UsersBoard.propTypes = {

};
