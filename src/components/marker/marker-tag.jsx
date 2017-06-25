import React, { PropTypes, Component } from 'react';
import '../../../style/marker/marker-tag.scss';

class MarkerTag extends Component {
  render() {
    const color = this.props.status.toLowerCase() === 'open' ? 'green' : 'red';
    return (
      <div className={`${color}-marker`} onClick={() => this.props.onClick()} >
        <i className="fa fa-tint fa-3x" />
      </div>
    );
  }
}

export default MarkerTag;

MarkerTag.defaultProps = {
  status: 'close',
};

MarkerTag.propTypes = {
  status: PropTypes.string,
};
