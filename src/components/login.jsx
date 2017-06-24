import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    return (<div className="Modal" style={{ marginTop: '50px' }}>
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

export default Login;
