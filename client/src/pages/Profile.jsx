import React, { Component } from 'react';
import withAuth from './../utils/withAuth';
import API from './../utils/API';
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    username: '',
    email: ''
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(({data}) => {
      this.setState({
        username: data.username,
        email: data.email
      })
    });
  }

  render() {
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <Link to="/">Go home</Link>
      </div>
    )
  }
}

export default withAuth(Profile);