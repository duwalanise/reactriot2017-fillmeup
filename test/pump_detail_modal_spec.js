import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PumpModalBox from '../src/components/pump_detail_modal.jsx';

describe('<PumpModalBox />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<PumpModalBox pumpDetail={{ pumpId: '1' }} />);
    it('should have specific props', () => {
      expect(wrapper.props.pumpDetail).to.be.defined;
    });
    it('should have specific states', () => {
      expect(wrapper.state().name).to.be.defined;
      expect(wrapper.state().address).to.be.defined;
      expect(wrapper.state().status).to.be.defined;
      expect(wrapper.state().contact).to.be.defined;
      expect(wrapper.state().distriputionToday).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.modal-dialog')).to.have.length(1);
      expect(wrapper.find('.modal-content')).to.have.length(1);
      expect(wrapper.find('.modal-header')).to.have.length(1);
      expect(wrapper.find('.modal-title')).to.have.length(1);
      expect(wrapper.find('.modal-body')).to.have.length(1);
      expect(wrapper.find('.modal-footer')).to.have.length(1);
    });
  });

  context('handleChange', () => {
    const wrapper = shallow(<PumpModalBox pumpDetail={{ pumpId: '1' }} />);
    it('should update specific state', () => {
      wrapper.instance().handleChange({ target: { name: 'uid', value: 5 } });
      expect(wrapper.state().uid).to.eql(5);
    });
  });
});
