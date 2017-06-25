import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MarkerTag from '../src/components/marker/marker-tag.jsx';

describe('<MarkerTag />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<MarkerTag
      status="OPEN"
      name="Hello"
      onClick={null}
    />);
    it('should have specific props', () => {
      expect(wrapper.props.status).to.be.defined;
      expect(wrapper.props.name).to.be.defined;
      expect(wrapper.props.onClick).to.be.defined;
    });
  });
});
