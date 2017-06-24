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
    const showInformation = this.state.isMarkerOpen ?
      <MarkerInfoTemplate pumpDetail={this.props.pumpDetail} onClick={this.handleClick} /> : null;
    return (
      <div className="marker">
        { showInformation }
        <MarkerTag
          status={this.props.pumpDetail.status}
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
