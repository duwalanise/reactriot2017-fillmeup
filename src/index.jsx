import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app.jsx';
import SimpleMap from './components/map.jsx';
import Login from './components/login.jsx';
import '../style/style.scss';
import store from '../src/store';

const config = {
  apiKey: "AIzaSyBIaSiMh-NgPcs2CW5jzRgmPJE_Y69XEpE",
  authDomain: "fill-me-up-f155d.firebaseapp.com",
  databaseURL: "https://fill-me-up-f155d.firebaseio.com",
  projectId: "fill-me-up-f155d",
  storageBucket: "fill-me-up-f155d.appspot.com",
  messagingSenderId: "752077583780",
};

firebase.initializeApp(config);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SimpleMap} />
        <Route path="/login" component={Login} />
        {/*<Route path="*" component={NotFound} />*/}
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));
