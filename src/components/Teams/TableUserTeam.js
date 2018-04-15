import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class TableUserTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.renderRows = this.renderRows.bind(this);
  }
  renderRows() {
    return this.props.data.map((user, i) => (
      <TableRow key={user.identity.low} selected={this.props.selectedRows.indexOf(i) >= 0}>
        <TableRowColumn>{user.properties.name}</TableRowColumn>
        <TableRowColumn>{user.properties.email}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/users/${user.identity.low}`} >
            see
          </Link>
        </TableRowColumn>
      </TableRow>
    ));
  }
  render() {
    return (
      <Table multiSelectable onRowSelection={this.props.onSelectedRow}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>eMail</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {this.renderRows()}
        </TableBody>
      </Table>
    );
  }
}
