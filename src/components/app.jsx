import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import store from '../store';
import Login from './login.jsx';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  }

  render() {
    return (<Provider store={store}>
      <Login signIn />
    </Provider>);
  }
}

export default App;
