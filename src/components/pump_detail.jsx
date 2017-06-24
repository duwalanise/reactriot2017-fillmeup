import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomChart from './chart.jsx';
import Switch from './switch.jsx';


class PumpDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columnChartOptions: {
        bar: { groupWidth: '65%' },
        chartArea: {
          width: '90%',
        },
        colors: ['#faa74a', '#08b'],
        dataOpacity: 0.7,
        fontName: 'Nunito Sans',
        focusTarget: 'category',
        hAxis: {
          textStyle: {
            color: '#a5a6b7',
            fontSize: 11,
          },
          gridlines: { count: 7, color: 'none' },
          format: 'd',
        },
        legend: {
          position: 'bottom',
          maxLines: 3,
          textStyle: {
            color: '#6d6d77',
          },
        },
        height: 350,
        isStacked: false,
        lineWidth: 0.5,
        tooltip: {
          trigger: 'focus',
        },
        vAxis: {
          baselineColor: '#454545',
          gridlines: {
            color: '#ddd',
            count: 6,
          },
          textStyle: { color: '#a5a6b7' },
          minValue: 1,
          format: 'decimal',
        },
      },
      columnChartColumns: [
        {
          type: 'date',
          label: 'Day',
        },
        {
          type: 'number',
          label: 'Supply',
        },
        {
          type: 'number',
          label: 'Sales',
        },
      ],
      columnChartHeader: ['Day', 'Supply', 'Sales'],
      columnData: [
        ['01/01/2017', 5000, 3000],
        ['01/02/2017', 6000, 5000],
        ['01/03/2017', 2500, 500],
        ['01/04/2017', 4500, 2500],
        ['01/05/2017', 6500, 4500],
        ['01/06/2017', 8500, 7500],
        ['01/07/2017', 3500, 1500],
      ],
      switchLabel: 'OPEN',
      switchChecked: true,
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  setupChartData(data, header) {
    data.forEach((datum) => {
      datum[0] = new Date(datum[0]);
    });
    return [header].concat(data);
  }

  checkStatus(currentPump) {
    this.setState({
      switchLabel: currentPump.status,
      switchChecked: currentPump.status.toUpperCase() === 'OPEN',
    });
  }

  handleSwitchChange() {
    const status = this.state.switchLabel === 'OPEN' ? 'CLOSED' : 'OPEN';
    this.setState({
      switchChecked: status === 'OPEN',
      switchLabel: status,
    });
  }

  render() {
    const currentPumpId = this.props.params.pumpId;
    const pumpDetails = this.props.pumpDetails;
    const currentPump = pumpDetails.filter(el => el.pumpId === currentPumpId);
    // this.checkStatus(currentPump[0]);
    const {
      columnChartColumns,
      columnChartOptions,
      columnChartHeader,
      columnData,
      switchLabel,
      switchChecked,
    } = this.state;
    return (
      <div className="pump-detail-wrapper">
        <div className="row">
          <div className="pump-detail">
            <div className="col-xs-6">
              <h4>{currentPump[0].name}
                <Switch
                  label={switchLabel}
                  isChecked={switchChecked}
                  onChange={this.handleSwitchChange}
                  isRound
                />
              </h4>
              <div className="other-detail">
                <span><i className="fa fa-circle" /> Address:</span>
                <span className="seperator">{currentPump[0].address}</span>
                <span><i className="fa fa-circle" /> Contact:</span>
                <span>{currentPump[0].contact}</span>
              </div>
            </div>
            <div className="col-xs-6 text-right">
              Today's information
              <div className="supply">
                <i className="fa fa-cart-arrow-down" /> Distribution: {currentPump[0].distriputionToday}
              </div>
              <div className="sales">
                <i className="fa fa-inr" /> Consumption: {currentPump[0].consumptionToday}
              </div>
            </div>
          </div>
        </div>
        <h4 className="log-week">Log of the past 1 week</h4>
        <CustomChart
          chartType="ColumnChart"
          chartData={this.setupChartData(columnData, columnChartHeader)}
          chartId="workstream-column-chart"
          options={columnChartOptions}
          columns={columnChartColumns}
        />
      </div>
    );
  };
};

const mapStateToProps = state => ({
  pumpDetails: state.pumpDetails,
});

export default connect(mapStateToProps)(PumpDetail);
