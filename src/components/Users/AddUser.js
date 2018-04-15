import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
      errorNameText: '',
      errorEmailText: '',
      organizationSelectValue: 0,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleTextChange(value, target) {
    const newState = { errorNameText: '', errorEmailText: '' };
    newState[target] = value;
    this.setState(newState);
  }
  addUser() {
    const {
      userNameValue,
      userEmailValue,
      organizationSelectValue,
    } = this.state;
    const errorState = {};
    if (!AddUser.validateEmail(userEmailValue)) {
      errorState.errorEmailText = 'invalid email';
    }
    if (userNameValue.length === 0) {
      errorState.errorNameText = 'no name';
    }
    if (Object.keys(errorState).length > 0) {
      return this.setState(errorState);
    }
    const fetchedUser = this.props.addUser(userNameValue, userEmailValue, organizationSelectValue);
    return fetchedUser.then(newState => this.setState(newState));
  }
  closeSnackbar() {
    this.setState({ snackbarOpen: false, snackbarMessage: '' });
  }
  handleSelectChange(event, index, value) {
    this.setState({ organizationSelectValue: value });
  }
  renderOrganizationsList() {
    return this.props.organizationsList.map(orga => (
      <MenuItem
        key={orga.identity.low}
        value={orga.identity.low}
        primaryText={orga.properties.name}
      />
    ));
  }
  render() {
    const {
      userNameValue,
      userEmailValue,
      errorNameText,
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
            errorText={errorNameText}
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
          <SelectField
            floatingLabelText="Organization"
            style={style.textField}
            value={this.state.organizationSelectValue}
            onChange={this.handleSelectChange}
          >
            <MenuItem
              value={0}
              primaryText="aucune"
            />
            {this.renderOrganizationsList()}
          </SelectField>
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
