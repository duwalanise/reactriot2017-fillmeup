import React, { PropTypes, Component } from 'react';
import '../../../style/marker/marker-text.scss';

class MarkerText extends Component {
  render() {
    const color = this.props.status === 'open' ? 'green' : 'red';
    return (
      <div className={`${color}-marker`}>
        <img alt="" src="../../../style/marker/fuel.png" />
      </div>
    );
  }
}

export default MarkerText;

MarkerText.defaultProps = {
  status: '',
};

MarkerText.propTypes = {
  status: PropTypes.string,
};
