import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { userLogin, userLogOut, storePumps } from '../action';
import Navigation from './navigation.jsx';

export class App extends Component {
  static signOut() {
    firebase.auth().signOut();
  }

  componentDidMount() {
    //listen to the auth change
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.dispatch(userLogin(user));
      } else {
        this.props.dispatch(userLogOut());
      }
    });

    //listen to realtime db change
    const pumpsRef = firebase.database().ref().child('pumps');
    pumpsRef.on('value', snap => (
      this.props.dispatch(storePumps(snap.val()))
    ));
  }

  render() {
    const { userDetail, children } = this.props;
    return (
      <div>
        <Navigation userDetail={userDetail} signOut={App.signOut} />
        <div className="children-wrap">
          {children}
        </div>
      </div>
    );
  }
}

export default connect(store => ({
  userDetail: store.userDetail,
}))(App);
