import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';

export default class SimpleMapPage extends Component {
  render() {
    return (
      <GoogleMap center={this.props.center} zoom={this.props.zoom} />
    );
  }
}
SimpleMapPage.defaultProps = {
  center: [27.6795718, 85.3171355],
  zoom: 9,
};

SimpleMapPage.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
};
