import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CustomChart from './chart.jsx';
import Switch from './switch.jsx';
import PumpModalBox from './pump_detail_modal.jsx';


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
      tabChange: '',
    };
  }

  setupChartData(data, header) {
    data.forEach((datum) => {
      datum[0] = new Date(datum[0]);
    });
    return [header].concat(data);
  }

  render() {
    const currentUserId = this.props.params.uid;
    const pumpDetails = this.props.pumpDetails;
    const currentPump = pumpDetails.filter(el => el.uid === currentUserId);
    if (pumpDetails.length === 0 || currentPump.length === 0) {
      return (
        <div className="pump-detail-wrapper text-center">
          <h3> You dont have any pump station. Add a new station right now.</h3>
          <button
            className="btn btn-primary"
            onClick={() => browserHistory.push('/pumps/new')}
          >Add new station</button>
        </div>
      );
    }
    const {
      columnChartColumns,
      columnChartOptions,
      columnChartHeader,
      columnData,
      tabChange,
    } = this.state;
    return (
      <div className="pump-detail-wrapper">
        <button
          className="btn btn-primary add-new-pump"
          onClick={() => browserHistory.push('/pumps/new')}
        >Add New</button>
        <div className="row">
          <div className="col-xs-12">
            <ul className="nav nav-tabs" id={`change_${tabChange}`}>
              {currentPump.map((pump, index) =>
                <li
                  key={pump.pumpId}
                  className={index === 0 ? 'active' : ''}
                  onClick={() => this.setState({ tabChange: pump.pumpId })}
                >
                  <a href={`#${pump.pumpId}`} data-toggle="tab">{pump.name}</a>
                </li>,
              )}
            </ul>
          </div>
        </div>
        <div className="tab-content">
          {currentPump.map((pump, index) =>
            <div key={pump.pumpId} className={`tab-pane ${index === 0 ? 'active' : ''}`} id={pump.pumpId}>
              <div className="row">
                <div className="pump-detail">
                  <div className="col-xs-6">
                    <h4>{pump.name}
                      <i
                        className="fa fa-pencil-square-o"
                        title="Edit"
                        data-toggle="modal"
                        data-target={`#${pump.pumpId.slice(1, 6)}`}
                      />
                      <Switch
                        label={pump.status}
                        isChecked={pump.status.toUpperCase() === 'OPEN'}
                        isRound
                      />
                    </h4>
                    <div className="other-detail">
                      <span><i className="fa fa-circle" /> Address:</span>
                      <span className="seperator">{pump.address || '-' }</span>
                      <span><i className="fa fa-circle" /> Contact:</span>
                      <span>{pump.contact || '-' }</span>
                    </div>
                  </div>
                  <div className="col-xs-6 text-right">
                    Today's information
                    <div className="supply">
                      <i className="fa fa-cart-arrow-down" /> Distribution: {pump.distriputionToday}
                    </div>
                    <div className="sales">
                      <i className="fa fa-inr" /> Consumption: {pump.consumptionToday}
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="log-week">Log of the past 1 week</h4>
              <CustomChart
                chartType="ColumnChart"
                chartData={this.setupChartData(columnData, columnChartHeader)}
                chartId={`column-chart-${pump.pumpId}`}
                options={columnChartOptions}
                columns={columnChartColumns}
              />
              <PumpModalBox pumpDetail={pump} />
            </div>,
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pumpDetails: state.pumpDetails,
});

export default connect(mapStateToProps)(PumpDetail);

PumpDetail.propTypes = {
  pumpDetails: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.any),
};
