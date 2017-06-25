import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import CustomChart from '../src/components/chart.jsx';

describe('<CustomChart />', () => {
  const wrapper = shallow(<CustomChart
    chartData={[]}
    chartType="test"
    options={{}}
    columns={[]}
    chartId="sampleId"
  />);

  context('Initial state', () => {
    it('should have specific props', () => {
      expect(wrapper.props.chartData).to.be.defined;
      expect(wrapper.props.chartType).to.be.defined;
      expect(wrapper.props.options).to.be.defined;
      expect(wrapper.props.columns).to.be.defined;
      expect(wrapper.props.chartId).to.be.defined;
    });
    it('should have specific states', () => {
      expect(wrapper.state().coulmns).to.be.defined;
      expect(wrapper.state().options).to.be.defined;
    });
    it('should have child Chart', () => {
      expect(wrapper.find('Chart')).to.have.length(1);
    });
  });

  context('Lifecycle componentWillMount', () => {
    wrapper.instance().componentWillMount();
    it('should update columns and options states', () => {
      expect(wrapper.state().columns).to.eql([]);
      expect(wrapper.state().options).to.eql({});
    });
  });
});
