import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Switch from '../src/components/switch.jsx';

describe('<Switch />', () => {
  const wrapper = shallow(<Switch />);
  context('Initial state', () => {
    it('should have specific props', () => {
      expect(wrapper.props.label).to.be.defined;
      expect(wrapper.props.isChecked).to.be.defined;
      expect(wrapper.props.onChange).to.be.defined;
      expect(wrapper.props.isRound).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.switch')).to.be.defined;
      expect(wrapper.find('.slider')).to.be.defined;
      expect(wrapper.find('.slider-label')).to.be.defined;
      expect(wrapper.props.isRound).to.be.defined;
    });
  });
});
