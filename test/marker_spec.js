import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Marker from '../src/components/marker/marker.jsx';

describe('<Marker />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<Marker
      pumpDetail={{ pumpId: '1', status: 'open' }}
    />);
    it('should have specific props', () => {
      expect(wrapper.props.pumpDetails).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.marker').length).to.equal(1);
    });
    it('should have specific children', () => {
      expect(wrapper.find('MarkerInfoTemplate')).to.have.length(0);
      expect(wrapper.find('MarkerTag')).to.have.length(1);
    });
  });
});
