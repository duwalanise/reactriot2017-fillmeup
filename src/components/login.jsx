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
    response.then(() => { browserHistory.push('/'); })
      .catch((error) => {
        console.log(error);
      });
  }

  handleGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { email, password, signIn } = this.state;
    return (<div className="login-modal">
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
                  >{ signIn ? 'Sign In' : 'Sign Up'}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-12">
              <div className="form-group">
                <button className="btn facebook-login"><i className="fa fa-facebook" />&nbsp;Facebook</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="form-group">
                <button onClick={() => this.handleGoogleSignIn()} className="btn google-login"><i className="fa fa-google" />&nbsp;Google</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Login;
