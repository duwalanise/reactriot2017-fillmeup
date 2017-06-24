import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import App from './components/app.jsx';
import SimpleMap from './components/map.jsx';

const config = {
  apiKey: "AIzaSyBIaSiMh-NgPcs2CW5jzRgmPJE_Y69XEpE",
  authDomain: "fill-me-up-f155d.firebaseapp.com",
  databaseURL: "https://fill-me-up-f155d.firebaseio.com",
  projectId: "fill-me-up-f155d",
  storageBucket: "fill-me-up-f155d.appspot.com",
  messagingSenderId: "752077583780",
};

firebase.initializeApp(config);

render(<SimpleMap />, document.getElementById('app'));
