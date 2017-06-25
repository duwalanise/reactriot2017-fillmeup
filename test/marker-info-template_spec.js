import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MarkerInfoTemplate from '../src/components/marker/marker-tag.jsx';

describe('<MarkerInfoTemplate />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<MarkerInfoTemplate
      pumpDetail={{ pumpId: '1', status: 'open' }}
    />);
    it('should have specific props', () => {
      expect(wrapper.props.pumpDetail).to.be.defined;
    });
  });
});
