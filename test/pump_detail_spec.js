import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PumpDetail } from '../src/components/pump_detail.jsx';

describe('<PumpDetail />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<PumpDetail
      pumpDetails={[{ pumpId: '1', status: 'open' }]}
      params={{}}
      tokens={[{}]}
    />);
    it('should have specific props', () => {
      expect(wrapper.props.pumpDetails).to.be.defined;
      expect(wrapper.props.params).to.be.defined;
      expect(wrapper.props.tokens).to.be.defined;
    });
    it('should have specific states', () => {
      expect(wrapper.state().columnChartOptions).to.be.defined;
      expect(wrapper.state().columnChartColumns).to.be.defined;
      expect(wrapper.state().columnChartHeader).to.be.defined;
      expect(wrapper.state().tabChange).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.pump-detail-wrapper').length).to.equal(1);
      expect(wrapper.find('.add-new-pump').length).to.equal(1);
      expect(wrapper.find('.tab-content').length).to.equal(1);
      expect(wrapper.find('.log-week').length).to.equal(1);
    });
    it('should have specific children', () => {
      expect(wrapper.find('Switch')).to.have.length(1);
      expect(wrapper.find('CustomChart')).to.have.length(2);
      expect(wrapper.find('PumpModalBox')).to.have.length(1);
    });
  });
});
