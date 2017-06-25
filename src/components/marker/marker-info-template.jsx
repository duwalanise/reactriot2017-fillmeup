import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import '../../../style/marker/marker-info.scss';
import { setDashOnNull } from '../../components/utilities/helper';

class MarkerInfoTemplate extends Component {
  render() {
    const { pumpDetail } = this.props;
    const handleInfoClose = (
      <span className="close-icon" onClick={() => this.props.onClick()} ><i className="fa fa-times" aria-hidden="true" /></span>
    );
    const hasAddress = R.has('address');
    const displayInformation = !hasAddress(pumpDetail) ?
      (<div className="container-fluid no-info">
        { handleInfoClose }
        <h4>No Information Available.</h4>
      </div>
      ) :
      (<div className="container-fluid">
        { handleInfoClose }
        <h4>{pumpDetail.name}</h4>
        <div className="row">
          <div className="col-xs-3">
            <label htmlFor="address">Address :</label>
          </div>
          <div className="col-xs-9">
            <p>{setDashOnNull(pumpDetail.address)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">
            <label htmlFor="open-hours">Open Hours :</label>
          </div>
          <div className="col-xs-9">
            <p>{setDashOnNull(pumpDetail.open_hours)}</p>
          </div>
        </div>
      </div>);
    return (
      <div className="marker-information">
        { displayInformation }
      </div>
    );
  }
}

export default MarkerInfoTemplate;

MarkerInfoTemplate.defaultProps = {
  pumpDetail: {},
};

MarkerInfoTemplate.propTypes = {
  pumpDetail: PropTypes.objectOf(PropTypes.any),
};
