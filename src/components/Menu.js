import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Menu extends Component {

  render() {
    return (
      <Drawer
        open={this.props.drawerOpen}
        docked={false}
        onRequestChange={this.props.toggleDrawer}
      >
        <Link to="/">
          <MenuItem onClick={this.props.toggleDrawer}>
            Users
          </MenuItem>
        </Link>
        <Link to="/organizations">
          <MenuItem onClick={this.props.toggleDrawer}>
            Organizations
          </MenuItem>
        </Link>
        <Link to="/teams">
          <MenuItem onClick={this.props.toggleDrawer}>
            Teams
          </MenuItem>
        </Link>
      </Drawer>
    );
  }
}
