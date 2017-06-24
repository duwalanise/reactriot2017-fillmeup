/* Description
  - Based on google Chart
  - requires props in the following format:
    const props = {
      chartType: 'AreaChart',
      chartData: [],
      chartId: 'workstream-area-chart',
      options: {},
      columns: [],
    }
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

class CustomChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentWillMount() {
    const newOptions = this.props.options;
    const columns = this.props.columns;
    this.setState({ options: newOptions, columns });
  }

  render() {
    return (
      <Chart
        chartType={this.props.chartType}
        data={this.props.chartData}
        options={this.state.options}
        graph_id={this.props.chartId}
        width="100%"
        height="400px"
      />
    );
  }
}

CustomChart.propTypes = {
  chartData: PropTypes.array,
  chartType: PropTypes.string,
  options: PropTypes.object,
  columns: PropTypes.array,
  chartId: PropTypes.string,
};

export default CustomChart;
