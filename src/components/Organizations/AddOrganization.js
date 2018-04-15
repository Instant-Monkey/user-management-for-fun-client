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

export default class AddOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationNameValue: '',
      snackbarOpen: false,
      snackbarMessage: '',
      errorNameText: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addOrganization = this.addOrganization.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleTextChange(value, target) {
    const newState = { errorNameText: '' };
    newState[target] = value;
    this.setState(newState);
  }
  addOrganization() {
    const {
      organizationNameValue,
    } = this.state;
    const errorState = {};
    if (organizationNameValue.length === 0) {
      errorState.errorNameText = 'no name';
    }
    if (Object.keys(errorState).length > 0) {
      return this.setState(errorState);
    }
    const fetchedOrganization = this.props.addOrganization(organizationNameValue);
    return fetchedOrganization.then(newState => this.setState(newState));
  }
  closeSnackbar() {
    this.setState({ snackbarOpen: false, snackbarMessage: '' });
  }
  render() {
    const {
      organizationNameValue,
      errorNameText,
    } = this.state;
    return (
      <div className="add-user-container">
        <Card>
          <CardHeader
            title="Add an organization"
            style={style.cardHeader}
          />
          <TextField
            floatingLabelText="Enter name"
            style={style.textField}
            errorText={errorNameText}
            value={organizationNameValue}
            onChange={e => this.handleTextChange(e.target.value, 'organizationNameValue')}
          />
          <CardActions>
            <FlatButton
              label="Add Organization"
              onClick={this.addOrganization}
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
AddOrganization.propTypes = {
  addOrganization: PropTypes.func.isRequired,
};
