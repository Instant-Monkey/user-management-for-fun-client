import React, { Component } from 'react';

const IdFetcher = (WrappedComponent, url) => (
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        objectFetched: {},
        usersList: [],
      };
      this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
      this.fetchData();
    }
    fetchData() {
      fetch(`${process.env.REACT_APP_API_URL}/${url}/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(fetched => this.setState({
          objectFetched: fetched,
        }));
      if (url === 'teams' || url === 'organizations') {
        fetch(`${process.env.REACT_APP_API_URL}/${url}/${this.props.match.params.id}/users`)
          .then(res => res.json())
          .then(fetched => this.setState({
            usersList: fetched,
          }));
      }
    }

    render() {
      return (
        <div className="id-page">
          <WrappedComponent
            data={this.state.objectFetched}
            usersList={this.state.usersList}
            {...this.props}
          />
        </div>  
      );
    }
  });

export default IdFetcher;
