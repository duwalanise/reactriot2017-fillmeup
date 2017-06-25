import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center,
      address: '',
    };
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
        center: [place.geometry.location.lat(), place.geometry.location.lng()],
      });
    }
    this.props.setCenter(this.state.center);
  }

  handleAddressChange(evt) {
    this.setState({ address: evt.target.value });
  }

  render() {
    const { address } = this.state;
    return (<div className="search-modal">
      <label htmlFor="Search">Search Location :</label>
      <input
        ref={input => this.textInput = input}
        type="text"
        name="address"
        placeholder="Address"
        value={address}
        className="form-control"
        style={{ marginBottom: '15px' }}
        onChange={center => this.handleAddressChange(center)}
        autoComplete="off"
      />
    </div>
    );
  }
}

export default SearchBar;
