import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginError, receiveLogin, requestLogin } from '../../actions';

import './index.css';

const CREATE_SESSION = 'http://localhost:3001/create-session';

class App extends Component {
  componentDidMount() {
    this.loginUser({ 
      name: 'user1',
      password: '123456'
    });
  }

  loginUser(credentials) {
    let config = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(credentials)
    }

    this.props.requestLogin(credentials);

    return fetch(CREATE_SESSION, config)
      .then(response =>
        response.json()
        .then(user => (
          { user, response }
        ))
      )
      .then(({ user, response }) => {
        if (!response.ok) {
          localStorage.removeItem('id_token');
          this.props.loginError(user.message)
          return Promise.reject(user)
        } else {
          localStorage.setItem('id_token', user.id_token)
          this.props.receiveLogin(user)
        }
      })
      .catch(err => console.log("Error: ", err))
  }

  render() {
    return (
      <div className="App">
        <Link to="/table">Table page</Link>
        {
          this.props.isLoading
            ? <h2>Loading...</h2>
            : <h2>{this.props.errorMessage || 'You are logged in'}</h2>
        }
      </div>
    );
  }
}


function mapStateToProps(props) {
  const { auth } = props
  const { errorMessage, isLoading } = auth

  return {
    isLoading,
    errorMessage
  }
}

export default connect(mapStateToProps, {
  loginError, receiveLogin, requestLogin
})(App);
