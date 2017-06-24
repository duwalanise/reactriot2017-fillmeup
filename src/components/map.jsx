import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './marker/marker.jsx';

class SimpleMapPage extends Component {
  render() {
    const { center, zoom, pumpDetails } = this.props;
    const showMarkers = pumpDetails.map(pumpDetail =>
      <Marker
        key={pumpDetail.pumpId}
        lat={pumpDetail.coordinates.lat}
        lng={pumpDetail.coordinates.lng}
        pumpDetail={pumpDetail}
      />,
    );
    return (
      <GoogleMap center={center} zoom={zoom}>
        { showMarkers }
      </GoogleMap>
    );
  }
}

export default connect(store => ({
  center: store.googleMapSetting.center,
  zoom: store.googleMapSetting.zoom,
  pumpDetails: store.pumpDetails,
}))(SimpleMapPage);

SimpleMapPage.defaultProps = {
  center: [0, 0],
  zoom: 12,
  pumpDetails: [],
};

SimpleMapPage.propTypes = {
  center: PropTypes.arrayOf(PropTypes.any),
  zoom: PropTypes.number,
  pumpDetails: PropTypes.arrayOf(PropTypes.object),
};
