import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Navigation from './navigation.jsx';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  }

  render() {
    return (
      <div>
        <Navigation userDetail={null} />
        {this.props.children}
      </div>
    );
  }
}

export default connect(() => ({

}))(App);
