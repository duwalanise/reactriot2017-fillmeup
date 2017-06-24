import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';

class SimpleMapPage extends Component {
  render() {
    return (
      <GoogleMap center={this.props.center} zoom={this.props.zoom} />
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
  center: PropTypes.array,
  zoom: PropTypes.number,
};
