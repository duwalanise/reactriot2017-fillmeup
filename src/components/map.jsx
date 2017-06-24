import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import MarkerText from './marker/marker-text.jsx';

class SimpleMapPage extends Component {
  render() {
    return (
      <GoogleMap center={this.props.center} zoom={this.props.zoom}>
        <MarkerText lat="27.6795718" lng="85.3171355" status={'open'} />
      </GoogleMap>
    );
  }
}

export default connect(store => ({
  center: store.googleMapSetting.center,
  zoom: store.googleMapSetting.zoom,
}))(SimpleMapPage);

SimpleMapPage.defaultProps = {
  center: [0, 0],
  zoom: 12,
};

SimpleMapPage.propTypes = {
  center: PropTypes.arrayOf(PropTypes.any),
  zoom: PropTypes.number,
};
