import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
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
  renderRows() {
    return this.props.data.map(element => (
      <TableRow key={element.identity.low}>
        <TableRowColumn>{element.properties.name}</TableRowColumn>
        {this.props.type === 'user' ? <TableRowColumn>{element.properties.email}</TableRowColumn> : null}
        <TableRowColumn>
          <Link to={`${this.props.url}${element.identity.low}`} >
            <RaisedButton
              label="See"
              primary
            />
          </Link>
        </TableRowColumn>
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
            {this.props.type === 'user' ? <TableHeaderColumn>eMail</TableHeaderColumn> : null}
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
