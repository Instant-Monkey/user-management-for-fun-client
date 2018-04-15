import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';

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

export default class TeamUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
    this.fetchTeam = this.fetchTeam.bind(this);
  }
  componentDidMount() {
    this.fetchTeam();
  }
  fetchTeam() {
    fetch(`${process.env.REACT_APP_API_URL}/teams/${this.props.team.identity.low}/users`)
      .then(res => res.json())
      .then(fetched => this.setState({
        usersList: fetched,
      }));
  }
  displayUsers() {
    return this.state.usersList.map(user => (
      <Link to={`/users/${user.identity.low}`}>
        <ListItem
          primaryText={user.properties.name}
        />
      </Link>));
  }
  render() {
    const {
      team,
    } = this.props;
    return (
      <div className="team-user-container">
        <Card>
          <CardHeader
            title={`Team : ${team.properties.name}`}
            style={style.cardHeader}
          />
          <CardTitle subtitle="List of users" />
          <CardText>
            <List>
              {this.displayUsers()}
            </List>
          </CardText>
          <CardActions>
            <Link to={`/teams/${team.identity.low}`}>
              <FlatButton
                label="See Team"
              />
            </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
}
