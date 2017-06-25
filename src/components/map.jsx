import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './marker/marker.jsx';
import { updateMarkerState } from './../action';
import SearchBar from './search_bar.jsx';

export class SimpleMapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pumpId: null,
      center: this.props.center,
    };
    this.setPumpId = this.setPumpId.bind(this);
    this.setCenter = this.setCenter.bind(this);
  }

  setPumpId(id) {
    this.props.dispatch(updateMarkerState(id));
  }

  setCenter(center) {
    this.setState({ center });
  }

  render() {
    const { zoom, pumpDetails } = this.props;
    const showMarkers = pumpDetails.map(pumpDetail =>
      <Marker
        key={pumpDetail.pumpId}
        lat={pumpDetail.coordinates.lat}
        lng={pumpDetail.coordinates.lng}
        pumpDetail={pumpDetail}
        setPumpId={id => this.setPumpId(id)}
      />,
    );
    return (
      <div>
        <GoogleMap center={this.state.center} zoom={zoom}>
          { showMarkers }
        </GoogleMap>
        <SearchBar
          center={this.state.center}
          setCenter={centers => this.setCenter(centers)}
        />
      </div>
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
