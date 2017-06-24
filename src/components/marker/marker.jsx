import React, { PropTypes, Component } from 'react';
import MarkerTag from './marker-tag.jsx';
import MarkerInfoTemplate from './marker-info-template.jsx';

class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = { isMarkerOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { isMarkerOpen } = this.state;
    this.setState({ isMarkerOpen: !isMarkerOpen });
  }
  
  render() {
    const { pumpDetail } = this.props;
    const showInformation = this.state.isMarkerOpen && pumpDetail ?
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
