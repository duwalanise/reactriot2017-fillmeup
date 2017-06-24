import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signIn: true,
      hasError: false,
      hasForgotten: false,
      resetSuccess: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgetPassword = this.handleForgetPassword.bind(this);
    this.handlePasswordResetClick = this.handlePasswordResetClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
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
    response.then(() => { browserHistory.push('/'); })
      .catch((error) => {
        console.log(error);
        this.setState({ hasError: true });
      });
  }

  getProvider(service) {
    switch (service) {
      case 'Google':
        return new firebase.auth.GoogleAuthProvider();
      case 'Facebook':
        return new firebase.auth.FacebookAuthProvider();
      case 'Twitter':
        return new firebase.auth.TwitterAuthProvider();
      default:
        return null;
    }
  }

  handleSignIn(service) {
    const provider = this.getProvider(service);
    firebase.auth().signInWithPopup(provider)
      .catch((error) => {
        console.log(error);
        this.setState({ hasError: true });
      });
  }

  displayLoginMsg() {
    if (this.state.hasError) {
      return (this.state.signIn) ?
      (<div className="alert alert-warning">
        Your email and password do not match. Please try again.
      </div>) :
      (<div className="alert alert-danger">
        We were unable to create your account. Please try again after ten minutes.
      </div>);
    }
    return null;
  }

  handleForgetPassword() {
    this.setState({ hasForgotten: true, hasError: false });
  }

  handleBackClick() {
    this.setState({ hasForgotten: false, hasError: false });
  }

  handlePasswordResetClick() {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ resetSuccess: true, hasError: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ resetSuccess: false, hasError: true });
      });
  }

  displayForgetMsg() {
    if (this.state.hasError) {
      return (this.state.resetSuccess) ?
      (<div className="alert alert-success">
        Reset instructions sent. Please check your email.
      </div>) :
      (<div className="alert alert-warning">
        The email is not registered in our system. Please sign up.
      </div>);
    }
    return null;
  }

  render() {
    const { email, password, signIn } = this.state;
    return (this.state.hasForgotten) ?
      (<div className="login-modal">
        { this.displayForgetMsg() }
        <div className="row">
          <div className="col-xs-12 forgotten-password">
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                className="form-control"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 forgotten-password">
            <div className="form-group">
              <button onClick={this.handlePasswordResetClick} className="btn btn-primary form-control">
                Send reset instructions
              </button>
            </div>
          </div>
        </div>
        <h5><span onClick={this.handleBackClick} className="forgetten-password-back">Back</span></h5>
      </div>) :
      (<div className="login-modal">
        { this.displayLoginMsg() }
        <div className="row">
          <div className="col-xs-6 login-info">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={email}
                      className="form-control"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      className="form-control"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group">
                    <button
                      className="btn btn-primary form-control"
                    >
                      { signIn ? 'Sign In' : 'Sign Up'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group">
                    <h5><span onClick={this.handleForgetPassword} className="forgot-password">Forgot password?</span></h5>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xs-6 social-login-options">
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <button
                    onClick={() => this.handleSignIn('Facebook')}
                    className="btn facebook-login"
                  >
                    <i className="fa fa-facebook" />&nbsp;Facebook
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <button
                    onClick={() => this.handleSignIn('Google')}
                    className="btn google-login"
                  >
                    <i className="fa fa-google" />&nbsp;Google
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <button
                    onClick={() => this.handleSignIn('Twitter')}
                    className="btn twitter-login"
                  >
                    <i className="fa fa fa-twitter" />&nbsp;Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default Login;
