import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { Card, CardActions, CardHeader } from 'material-ui/Card';

const style = {
  textField: {
    width: '80%',
    padding: '24px',
    height: '60px',
  },
  cardHeader: {
    padding: ' 14px 24px',
  },
};

export default class AddUser extends Component {
  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  constructor(props) {
    super(props);
    this.state = {
      userNameValue: '',
      userEmailValue: '',
      snackbarOpen: false,
      snackbarMessage: '',
      errorEmailText: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleTextChange(value, target) {
    const newState = { errorEmailText: '' };
    newState[target] = value;
    this.setState(newState);
  }
  addUser() {
    const {
      userNameValue,
      userEmailValue,
    } = this.state;
    if (!AddUser.validateEmail(userEmailValue)) {
      return this.setState({
        errorEmailText: 'invalid email',
      });
    }
    const fetchedUser = this.props.addUser(userNameValue, userEmailValue);
    return fetchedUser.then(newState => this.setState(newState));
  }
  closeSnackbar() {
    this.setState({ snackbarOpen: false, snackbarMessage: '' });
  }
  render() {
    const {
      userNameValue,
      userEmailValue,
      errorEmailText,
    } = this.state;
    return (
      <div className="add-user-container">
        <Card>
          <CardHeader
            title="Add a user"
            style={style.cardHeader}
          />
          <TextField
            floatingLabelText="Enter name"
            style={style.textField}
            value={userNameValue}
            onChange={e => this.handleTextChange(e.target.value, 'userNameValue')}
          />
          <TextField
            floatingLabelText="Enter email"
            errorText={errorEmailText}
            style={style.textField}
            value={userEmailValue}
            onChange={e => this.handleTextChange(e.target.value, 'userEmailValue')}
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
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}
AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
};
