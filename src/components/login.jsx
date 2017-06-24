import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { updateGoogleSessionInfo } from '../action/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signIn: this.props.signIn,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { email, password, signIn } = this.state;
    const auth = firebase.auth();
    let response;
    if (signIn) {
      response = auth.signInWithEmailAndPassword(email, password);
    } else {
      response = auth.createUserWithEmailAndPassword(email, password);
    }
    console.log(response);
  }

  handleGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      this.props.dispatch(updateGoogleSessionInfo(user, token));
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  render() {
    const { email, password, signIn } = this.state;
    return (<div className="Modal">
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="email" placeholder="Email" value={email} required onChange={this.handleChange} />
        <input type="password" name="password" placeholder="Password" value={password} required onChange={this.handleChange} />
        <button ref={(btn) => { this.signIn = btn; }}>{ signIn ? 'Sign In' : 'Sign Up'}</button>
      </form>
      <div className="social-signin">
        <button className="fb" onClick={this.props.onClick}><i className="fa fa-facebook" aria-hidden="true" /></button>
        <button className="tw" onClick={this.props.onClick}><i className="fa fa-twitter" aria-hidden="true" /></button>
      </div>
      <a href="#">Lost your password ?</a>
      <div className="btn-primary" onClick={() => this.handleGoogleSignIn()}>Click</div>
    </div>);
  }
}

export default connect(store => ({
  user: store.googleSessionInfo.user,
  token: store.googleSessionInfo.token,
}))(Login);
