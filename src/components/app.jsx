import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Login from './login.jsx';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  }

  render() {
    return <Login signIn />;
  }
}

export default connect(store => ({
  test: store.test,
}))(App);
