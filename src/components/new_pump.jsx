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
      pumpId: '',
      uid: this.props.uid,
      name: '',
      address: '',
      status: 'open',
      contact: '',
      coordinates: { lat: 28, lng: 28 },
      consumptionToday: 0,
      distriputionToday: 0,
      log: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  componentDidMount() {
    const autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(this.textInput),
    { types: ['geocode'] });
    autocomplete.addListener('place_changed', () => { const newAuto = autocomplete; this.fillInAddress(newAuto); });
  }

  fillInAddress(autocomplete) {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      this.setState({
        address: place.formatted_address,
        coordinates: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
      });
    }
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
    browserHistory.push(`/pumps/${this.props.uid}`);
  }

  handleAddressChange(evt) {
    this.setState({ address: evt.target.value });
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
        <input
          ref={input => this.textInput = input}
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          className="form-control"
          style={{ marginBottom: '15px' }}
          onChange={this.handleAddressChange}
          autoComplete="off"
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
          <GoogleMap center={[coordinates.lat, coordinates.lng]} zoom={14} onClick={this.mapClick}>
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

NewPump.propTypes = {
  uid: PropTypes.string,
};
