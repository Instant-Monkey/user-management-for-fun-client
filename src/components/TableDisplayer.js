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

export default class TableDisplayer extends Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  renderRows() {
    return this.props.data.map(element => (
      <TableRow>
        <TableRowColumn>{element.properties.name}</TableRowColumn>
        <TableRowColumn>{element.properties.email}</TableRowColumn>
        <TableRowColumn><Link to={`/${element.identity.low}`} >edit</Link> </TableRowColumn>
      </TableRow>
    ));
  }
  render() {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>eMail</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderRows()}
        </TableBody>
      </Table>
    );
  }
}
