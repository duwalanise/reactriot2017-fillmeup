import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  render() {
    return (<Provider store={store}>
      <div>Hello</div>
    </Provider>);
  }
}

export default App;
