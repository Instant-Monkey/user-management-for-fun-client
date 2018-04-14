import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { Card, CardActions, CardHeader } from 'material-ui/Card';

const style = {
  textField: {
    width: '80%',
    padding: '16px',
    height: '40px',
  },
  cardHeader: {
    padding: ' 8px 16px',
  },
};

export default class UsersBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameValue: '',
      userEmailValue: '',
      snackbarOpen: false,
      snackbarMessage: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  handleNameChange(e) {
    this.setState({
      userNameValue: e.target.value,
    });
  }
  handleEmailChange(e) {
    this.setState({
      userEmailValue: e.target.value,
    });
  }
  addUser() {
    fetch(`${process.env.REACT_APP_API_URL}/users/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.userNameValue,
        email: this.state.userEmailValue,
      }),
    }).then(res => res.json())
      .then(newUser => this.setState({
        snackbarOpen: true,
        userNameValue: '',
        userEmailValue: '',
        snackbarMessage: `${newUser.properties.name} was sucessfully added`,
      }));
  }
  render() {
    const {
      userNameValue,
      userEmailValue,
    } = this.state;
    return (
      <div className="user-board-container">
        <Card>
          <CardHeader
            title="Add a user"
            style={style.cardHeader}
          />
          <TextField
            floatingLabelText="Enter name"
            style={style.textField}
            value={userNameValue}
            onChange={this.handleNameChange}
          />
          <TextField
            floatingLabelText="Enter email"
            style={style.textField}
            value={userEmailValue}
            onChange={this.handleEmailChange}
          />
          <CardActions>
            <FlatButton
              label="Add User"
              onClick={this.addUser}
            />
          </CardActions>
        </Card>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}
UsersBoard.propTypes = {

};
