import React from 'react';
import * as firebase from 'firebase';

class Login extends React.Component {
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
    </div>);
  }
}

export default Login;
