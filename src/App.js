import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';


import OrganizationsBoard from './components/OrganizationsBoard';
import TeamsBoard from './components/TeamsBoard';
import UsersBoard from './components/UsersBoard';
import Menu from './components/Menu';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer() {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }
    ));
  }
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar
            title="Users"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.toggleDrawer}
          />
          <Menu
            toggleDrawer={this.toggleDrawer}
            drawerOpen={this.state.drawerOpen}
          />

          <Route exact path="/" component={UsersBoard} />
          <Route exact path="/organizations" component={OrganizationsBoard} />
          <Route exact path="/teams" component={TeamsBoard} />
        </div>
      </Router>
    );
  }
}

export default App;
