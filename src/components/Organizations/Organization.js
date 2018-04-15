import React, { Component } from 'react';
import TableDisplayer from '../TableDisplayer';

export default class Organization extends Component {

  render() {
    return(
      <div className="organization-page">
        <h1>{`Organization ${this.props.data.properties ? this.props.data.properties.name : ''}`}</h1>
        {this.props.usersList.length > 0 ? <TableDisplayer data={this.props.usersList} type="user" url="/users/" /> : null}
      </div>
    )
  }
}
