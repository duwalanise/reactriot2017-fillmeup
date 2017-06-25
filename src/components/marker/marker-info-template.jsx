import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import '../../../style/marker/marker-info.scss';
import { setDashOnNull } from '../../components/utilities/helper';
import CustomChart from '../chart.jsx';

class MarkerInfoTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
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
      title: 'Daily Activities',
      titleTextStyle: { fontSize: 12 },
    };
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
                <h4>{pumpDetail.name} <span>{pumpDetail.status}</span></h4>
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
            <div className="row">
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
          </div>
          <div className="col-xs-4">
            <CustomChart
              chartType="PieChart"
              chartData={[
                ['Supply', 'Sales'],
                ['Consumption', Number(pumpDetail.consumptionToday || 0)],
                ['Distribution', Number(pumpDetail.distriputionToday || 0)],
              ]}
              chartId={`pie-chart-${pumpDetail.pumpId}`}
              options={pieChartOptions}
            />
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
