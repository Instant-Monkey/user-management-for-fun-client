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

export default class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNameValue: '',
      snackbarOpen: false,
      snackbarMessage: '',
      errorNameText: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleTextChange(value, target) {
    const newState = { errorNameText: '' };
    newState[target] = value;
    this.setState(newState);
  }
  addTeam() {
    const {
      teamNameValue,
    } = this.state;
    const errorState = {};
    if (teamNameValue.length === 0) {
      errorState.errorNameText = 'no name';
    }
    if (Object.keys(errorState).length > 0) {
      return this.setState(errorState);
    }
    const fetchedTeam = this.props.addTeam(teamNameValue);
    return fetchedTeam.then(newState => this.setState(newState));
  }
  closeSnackbar() {
    this.setState({ snackbarOpen: false, snackbarMessage: '' });
  }
  render() {
    const {
      teamNameValue,
      errorNameText,
    } = this.state;
    return (
      <div className="add-user-container">
        <Card>
          <CardHeader
            title="Add a team"
            style={style.cardHeader}
          />
          <TextField
            floatingLabelText="Enter name"
            style={style.textField}
            errorText={errorNameText}
            value={teamNameValue}
            onChange={e => this.handleTextChange(e.target.value, 'teamNameValue')}
          />
          <CardActions>
            <FlatButton
              label="Add Team"
              onClick={this.addTeam}
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
AddTeam.propTypes = {
  addTeam: PropTypes.func.isRequired,
};
