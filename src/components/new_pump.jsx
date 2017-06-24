import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';
import GoogleMap from 'google-map-react';
import Input from './input.jsx';
import Marker from './marker/marker.jsx';

class NewPump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pumpId:'',
      uid: this.props.uid,
      name: '',
      address: '',
      status: 'open',
      contact: '',
      coordinates: { lat: null, lng: null },
      consumption_today: 0,
      distripution_today: 0,
      log: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mapClick = this.mapClick.bind(this);
  }

  generateId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return `${text}${Date.now()}`;
  }

  mapClick({ lat, lng }) {
    this.setState({
      coordinates: { lat, lng },
    });
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    this.state.pumpId = this.generateId();
    evt.preventDefault();
    const dbref = firebase.database().ref();
    dbref.child('pumps').push(this.state);
  }

  render() {
    const { name, address, contact, coordinates } = this.state;
    return (<div className="login-modal">
      <h4>Add Station</h4>
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          className="form-control"
          required
          handleChange={this.handleChange}
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          className="form-control"
          handleChange={this.handleChange}
        />
        <Input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={contact}
          className="form-control"
          handleChange={this.handleChange}
        />
        <div className="choose-location">
          <GoogleMap center={[0, 0]} zoom={3} onClick={this.mapClick}>
            <Marker
              lat={coordinates.lat}
              lng={coordinates.lng}
            />
          </GoogleMap>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <button
                className="btn btn-primary form-control"
              >Add</button>
            </div>
          </div>
        </div>
      </form>
    </div>);
  }
}

export default connect(store => ({
  uid: store.userDetail.uid,
}))(NewPump);
