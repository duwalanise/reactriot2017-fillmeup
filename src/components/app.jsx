import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { userLogin, userLogOut } from '../action';
import Navigation from './navigation.jsx';

class App extends Component {
  static signOut() {
    firebase.auth().signOut();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.dispatch(userLogin(user));
      } else {
        this.props.dispatch(userLogOut());
      }
    });
  }
 

  render() {
    const { userDetail, children } = this.props;
    return (
      <div>
        <Navigation userDetail={userDetail} signOut={App.signOut} />
        {children}
      </div>
    );
  }
}

export default connect(store => ({
  userDetail: store.userDetail,
}))(App);
