import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';


import OrganizationsBoard from './components/Organizations/OrganizationsBoard';
import Organization from './components/Organizations/Organization';
import IdFetcher from './components/IdFetcher';
import TeamsBoard from './components/Teams/TeamsBoard';
import Team from './components/Teams/Team';
import UsersBoard from './components/Users/UsersBoard';
import User from './components/Users/User';
import Menu from './components/Menu';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      appTitle: 'Users',
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }
  setTitle(title) {
    this.setState({
      appTitle: title,
    });
  }
  toggleDrawer() {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen,
    }
    ));
  }
  render() {
    return (
      <div className="App">
        <AppBar
          title={this.state.appTitle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.toggleDrawer}
          className="app-bar"
        />
        <Menu
          toggleDrawer={this.toggleDrawer}
          drawerOpen={this.state.drawerOpen}
        />

        <Route
          exact
          path="/"
          render={
          ({ location, match }) => (<UsersBoard
            location={location}
            match={match}
            setTitle={this.setTitle}
          />)
          }
        />
        <Route
          exact
          path="/users/:id"
          render={
          ({ location, match }) => {
            const Wrapped = IdFetcher(User, 'users');
            return (
              <Wrapped
                location={location}
                match={match}
              />);
          }
          }
        />
        <Route
          exact
          path="/organizations"
          render={
          ({ location, match }) => (<OrganizationsBoard
            location={location}
            match={match}
            setTitle={this.setTitle}
          />)
          }
        />
        <Route
          exact
          path="/organizations/:id"
          render={
          ({ location, match }) => {
            const Wrapped = IdFetcher(Organization, 'organizations');
            return (
              <Wrapped
                location={location}
                match={match}
              />);
          }
          }
        />
        <Route
          exact
          path="/teams"
          render={
          ({ location, match }) => (<TeamsBoard
            location={location}
            match={match}
            setTitle={this.setTitle}
          />)
          }
        />
        <Route
          exact
          path="/teams/:id"
          render={
          ({ location, match }) => {
            const Wrapped = IdFetcher(Team, 'teams');
            return (
              <Wrapped
                location={location}
                match={match}
              />);
          }
          }
        />
      </div>
    );
  }
}

export default App;
