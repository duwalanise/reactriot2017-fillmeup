import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import MarkerTag from './marker-tag.jsx';
import MarkerInfoTemplate from './marker-info-template.jsx';

class Marker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { pumpDetail } = this.props;
    if (!pumpDetail.isMarkerOpen) {
      this.props.setPumpId(pumpDetail.pumpId);
    } else {
      this.props.setPumpId(null);
    }
  }

  render() {
    const { pumpDetail } = this.props;
    const showInformation = pumpDetail.isMarkerOpen && !R.isEmpty(pumpDetail) ?
      <MarkerInfoTemplate pumpDetail={pumpDetail} onClick={this.handleClick} /> : null;
    return (
      <div className="marker">
        { showInformation }
        <MarkerTag
          status={pumpDetail.status}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Marker;

Marker.defaultProps = {
  pumpDetail: {},
};

Marker.propTypes = {
  pumpDetail: PropTypes.objectOf(PropTypes.any),
};
