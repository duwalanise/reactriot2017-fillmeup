import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Navigation from '../src/components/navigation.jsx';

describe('<Navigation />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<Navigation userDetail={{}} signOut={null} />);
    it('should have specific props', () => {
      expect(wrapper.props.navType).to.be.defined;
      expect(wrapper.props.navStyle).to.be.defined;
      expect(wrapper.props.navContent).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.navbar')).to.have.length(1);
      expect(wrapper.find('.navbar-header')).to.have.length(1);
      expect(wrapper.find('.navbar-toggle')).to.have.length(1);
      expect(wrapper.find('.icon-bar')).to.have.length(3);
      expect(wrapper.find('.navbar-brand')).to.have.length(1);
      expect(wrapper.find('.navbar-collapse')).to.have.length(1);
      expect(wrapper.find('.navbar-nav')).to.have.length(1);
    });
  });
});
