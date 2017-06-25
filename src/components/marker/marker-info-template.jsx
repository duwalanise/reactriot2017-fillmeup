import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import * as firebase from 'firebase';
import '../../../style/marker/marker-info.scss';
import { setDashOnNull } from '../../components/utilities/helper';
import CustomChart from '../chart.jsx';


class MarkerInfoTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', disabled: false, token: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  generateId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return `${text}${Date.now()}`;
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = firebase.database().ref().child('token');
    const generatedToken = this.generateId();
    token.push({
      tokenId: generatedToken,
      quantity: this.state.value,
      pumpId: this.props.pumpDetail.pumpId,
    }).then(() => {
      this.setState({ disabled: true, token: generatedToken });
    }).catch(() => {
      this.setState({ disabled: false });
    });
  }

  render() {
    const { pumpDetail } = this.props;
    const handleInfoClose = (
      <span className="close-icon" onClick={() => this.props.onClick()} ><i className="fa fa-times" aria-hidden="true" /></span>
    );
    const hasAddress = R.has('address');
    const pieChartOptions = {
      legend: 'none',
      colors: ['#faa74a', '#08b'],
      fontName: 'Nunito Sans',
      width: 150,
      height: 150,
      title: 'Today\'s Activity',
      titleTextStyle: { fontSize: 12 },
    };
    const showSuccess = this.state.disabled ? (<span className="success-info">SUCCESS !!</span>) : null;
    const showFormContent = (!this.state.disabled && pumpDetail.status === 'open') ?
    (<div className="row">
      <div className="col-xs-4">
        <label htmlFor="contact">Fill me up :</label>
      </div>
      <div className="col-xs-8">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <div className="input-group">
              <input
                type="number"
                className="form-control input-sm"
                name="booked_fuel"
                placeholder="No of liters"
                min="1"
                required
                onChange={this.handleChange}
              />
              <div className="input-group-addon">liters</div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-xs">Submit</button>
        </form>
      </div>
    </div>
    ) : (pumpDetail.status === 'open' ? (
      <span className="token-info">
        Your Token ID : {this.state.token}
        <br />
        <strong>Don't forget this token ID </strong>
      </span>
    ) : (<span className="token-info">No Token Available.</span>));

    const displayInformation = !hasAddress(pumpDetail) ?
      (<div className="container-fluid no-info">
        { handleInfoClose }
        <h4>No Information Available.</h4>
      </div>
      ) :
      (<div className="container-fluid">
        { handleInfoClose }
        <div className="row">
          <div className="col-xs-8">
            <div className="row">
              <div className="col-xs-12">
                <h4>{pumpDetail.name} <span
                  className={pumpDetail.status === 'close' ? 'status-close' : ''}
                >{pumpDetail.status}</span></h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <label htmlFor="address">Address :</label>
              </div>
              <div className="col-xs-8">
                <p>{setDashOnNull(pumpDetail.address)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <label htmlFor="open-hours">Open Hours :</label>
              </div>
              <div className="col-xs-8">
                <p>{setDashOnNull(pumpDetail.open_hours)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <label htmlFor="contact">Contact :</label>
              </div>
              <div className="col-xs-8">
                <p>{setDashOnNull(pumpDetail.contact)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <label htmlFor="contact">Availability :</label>
              </div>
              <div className="col-xs-8">
                <p>{setDashOnNull(Number(pumpDetail.distriputionToday) - Number(pumpDetail.consumptionToday))} liters</p>
              </div>
            </div>
            { showFormContent }
          </div>
          <div className="col-xs-4">
            <CustomChart
              chartType="PieChart"
              chartData={[
                ['Supply', 'Sales'],
                ['Consumption', Number(pumpDetail.consumptionToday || 0)],
                ['Available', Number(pumpDetail.distriputionToday || 0) - Number(pumpDetail.consumptionToday || 0)],
              ]}
              chartId={`pie-chart-${pumpDetail.pumpId}`}
              options={pieChartOptions}
            />
            { showSuccess }
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
